/** Escala Numérica del Dolor (NRS-11): entero 0–10. */
export const NRS_MIN = 0
export const NRS_MAX = 10

export type Nrs11Value = number

export function parseNrs11(raw: unknown): Nrs11Value | null {
  if (typeof raw !== "number" || !Number.isInteger(raw)) return null
  if (raw < NRS_MIN || raw > NRS_MAX) return null
  return raw
}

export function isValidNrs11(v: number): boolean {
  return Number.isInteger(v) && v >= NRS_MIN && v <= NRS_MAX
}
