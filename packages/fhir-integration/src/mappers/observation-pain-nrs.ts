import type { Nrs11Value } from "@alli/clinical-models"

/** Recurso Observation (FHIR R4) mínimo para intensidad de dolor (NRS). */
export interface FhirObservationPainNrs {
  resourceType: "Observation"
  status: "final"
  code: {
    coding: Array<{
      system: string
      code: string
      display: string
    }>
  }
  valueInteger: Nrs11Value
}

const LOINC_PAIN_SEVERITY = {
  system: "http://loinc.org",
  code: "38208-5",
  display: "Pain severity [Reported]",
}

export function toFhirObservationPainNrs(
  value: Nrs11Value,
  patientReference?: string,
): FhirObservationPainNrs {
  const obs: FhirObservationPainNrs = {
    resourceType: "Observation",
    status: "final",
    code: {
      coding: [LOINC_PAIN_SEVERITY],
    },
    valueInteger: value,
  }
  void patientReference
  return obs
}
