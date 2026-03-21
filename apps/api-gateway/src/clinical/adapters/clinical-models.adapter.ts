import { Injectable } from "@nestjs/common"
import {
  DEFAULT_MINSAL_POLICY,
  deriveTriageDestination,
  type TriageDestination,
  type TriageSignalSnapshot,
} from "@alli/clinical-models"
import type { ClinicalAssessmentPort } from "../../domain/ports/clinical-assessment.port"

@Injectable()
export class ClinicalModelsAdapter implements ClinicalAssessmentPort {
  deriveDestination(signal: TriageSignalSnapshot): TriageDestination {
    return deriveTriageDestination(signal, DEFAULT_MINSAL_POLICY)
  }
}
