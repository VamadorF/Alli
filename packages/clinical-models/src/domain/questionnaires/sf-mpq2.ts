/**
 * SF-MPQ-2: cualidades sensoriales y afectivas (resumen de dominio).
 * Aquí se modelan subescalas representativas; el puntaje total es la suma ponderada declarada.
 */
export type SfMpq2SubscaleKey =
  | "continuous"
  | "intermittent"
  | "neuropathic"
  | "affective"

export type SfMpq2ItemScores = Record<string, number>

export interface SfMpq2Result {
  readonly subscaleTotals: Record<SfMpq2SubscaleKey, number>
  readonly grandTotal: number
}

const DEFAULT_WEIGHTS: Record<SfMpq2SubscaleKey, readonly string[]> = {
  continuous: ["throbbing", "shooting", "stabbing", "sharp", "cramping", "aching", "heavy", "tender"],
  intermittent: ["splitting", "tiring", "exhausting", "sickening", "fearful", "punishing"],
  neuropathic: ["hot", "cold", "numb", "tingling", "itchy", "electric"],
  affective: ["unpleasant", "miserable", "intense", "unbearable"],
}

export function scoreSfMpq2(
  items: SfMpq2ItemScores,
  weights: Record<SfMpq2SubscaleKey, readonly string[]> = DEFAULT_WEIGHTS,
): SfMpq2Result {
  const subscaleTotals = {} as Record<SfMpq2SubscaleKey, number>
  let grandTotal = 0
  for (const key of Object.keys(weights) as SfMpq2SubscaleKey[]) {
    let sub = 0
    for (const id of weights[key]) {
      const v = items[id]
      if (typeof v === "number" && v >= 0) sub += v
    }
    subscaleTotals[key] = sub
    grandTotal += sub
  }
  return { subscaleTotals, grandTotal }
}
