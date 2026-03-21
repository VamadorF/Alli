/** PHQ-2: dos ítems 0–3. Alerta clínica si la suma supera 3 puntos. */
export const PHQ2_ITEM_MAX = 3
export const PHQ2_ALERT_THRESHOLD = 3

export interface Phq2Input {
  readonly littleInterest: number
  readonly feelingDown: number
}

export interface Phq2Result {
  readonly total: number
  readonly alertRecommended: boolean
}

export function scorePhq2(input: Phq2Input): Phq2Result {
  const a = clampItem(input.littleInterest)
  const b = clampItem(input.feelingDown)
  const total = a + b
  return {
    total,
    alertRecommended: total > PHQ2_ALERT_THRESHOLD,
  }
}

function clampItem(n: number): number {
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(PHQ2_ITEM_MAX, Math.round(n)))
}
