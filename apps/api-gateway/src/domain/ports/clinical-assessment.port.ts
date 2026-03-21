import type { TriageDestination, TriageSignalSnapshot } from "@alli/clinical-models"

export const CLINICAL_ASSESSMENT_PORT = Symbol("CLINICAL_ASSESSMENT_PORT")

export interface ClinicalAssessmentPort {
  deriveDestination(signal: TriageSignalSnapshot): TriageDestination
}
