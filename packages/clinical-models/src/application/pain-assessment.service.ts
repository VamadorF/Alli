import { parseNrs11 } from "../domain/pain/nrs11"
import { normalizeFpsRToNrs } from "../domain/pain/fps-r"
import { scorePhq2, type Phq2Input } from "../domain/questionnaires/phq2"
import { scoreSfMpq2, type SfMpq2ItemScores } from "../domain/questionnaires/sf-mpq2"
import {
  createEmptyTopology,
  toTopologyVector,
  type PainTopologyVector,
} from "../domain/pain/digital-pain-map"

export interface MultimodalPainCapture {
  readonly nrsPrimary?: number
  readonly fpsRAlternative?: number
  readonly sfMpq2Items?: SfMpq2ItemScores
  readonly phq2?: Phq2Input
  readonly topology?: readonly boolean[]
}

export class PainAssessmentService {
  resolveIntensity(input: MultimodalPainCapture): { value: number; source: "NRS" | "FPS-R" } | null {
    const nrs = input.nrsPrimary != null ? parseNrs11(input.nrsPrimary) : null
    if (nrs != null) return { value: nrs, source: "NRS" }
    const fps = input.fpsRAlternative != null ? normalizeFpsRToNrs(input.fpsRAlternative) : null
    if (fps != null) return { value: fps, source: "FPS-R" }
    return null
  }

  evaluateQuestionnaires(input: MultimodalPainCapture) {
    const mpq = input.sfMpq2Items ? scoreSfMpq2(input.sfMpq2Items) : null
    const phq = input.phq2 ? scorePhq2(input.phq2) : null
    return { mpq, phq }
  }

  ensureTopology(raw?: readonly boolean[]): PainTopologyVector {
    if (!raw) return toTopologyVector(createEmptyTopology())
    return toTopologyVector(raw)
  }
}
