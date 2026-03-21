/**
 * Motor de triaje parametrizable (directrices MINSAL — reglas simplificadas de dominio).
 * Destinos: atención primaria (SAR, SAPU, SUR) o urgencia hospitalaria (UEH).
 */
export type PrimaryCareUnit = "SAR" | "SAPU" | "SUR"
export type TriageDestination = PrimaryCareUnit | "UEH"

export interface TriageSignalSnapshot {
  readonly nrs: number
  readonly redFlags: boolean
  readonly phq2Total: number
  readonly unstableVitals: boolean
}

export interface MinsalTriagePolicy {
  readonly uehNrsThreshold: number
  readonly preferPrimaryWhenStableBelow: number
  readonly defaultPrimary: PrimaryCareUnit
}

export const DEFAULT_MINSAL_POLICY: MinsalTriagePolicy = {
  uehNrsThreshold: 8,
  preferPrimaryWhenStableBelow: 7,
  defaultPrimary: "SAPU",
}

export function deriveTriageDestination(
  signal: TriageSignalSnapshot,
  policy: MinsalTriagePolicy = DEFAULT_MINSAL_POLICY,
): TriageDestination {
  if (signal.redFlags || signal.unstableVitals) return "UEH"
  if (signal.nrs >= policy.uehNrsThreshold) return "UEH"
  if (signal.nrs <= policy.preferPrimaryWhenStableBelow && !signal.redFlags) {
    return policy.defaultPrimary
  }
  return "SAPU"
}
