import { Inject, Injectable } from "@nestjs/common"
import { toFhirObservationPainNrs } from "@alli/fhir-integration"
import type { Nrs11Value } from "@alli/clinical-models"
import {
  CLINICAL_ASSESSMENT_PORT,
  type ClinicalAssessmentPort,
} from "../domain/ports/clinical-assessment.port"

@Injectable()
export class ClinicalService {
  constructor(
    @Inject(CLINICAL_ASSESSMENT_PORT)
    private readonly assessment: ClinicalAssessmentPort,
  ) {}

  triage(body: {
    nrs: number
    redFlags?: boolean
    phq2Total?: number
    unstableVitals?: boolean
  }) {
    const signal = {
      nrs: body.nrs,
      redFlags: Boolean(body.redFlags),
      phq2Total: body.phq2Total ?? 0,
      unstableVitals: Boolean(body.unstableVitals),
    }
    return {
      destination: this.assessment.deriveDestination(signal),
      fhirObservation: toFhirObservationPainNrs(body.nrs as Nrs11Value),
    }
  }
}
