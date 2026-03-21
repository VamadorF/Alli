import { describe, expect, it } from "vitest"
import { PHQ2_ALERT_THRESHOLD, scorePhq2 } from "./phq2"

describe("PHQ-2", () => {
  it("alerta si total > umbral", () => {
    const r = scorePhq2({ littleInterest: 2, feelingDown: 2 })
    expect(r.total).toBe(4)
    expect(r.alertRecommended).toBe(true)
    expect(PHQ2_ALERT_THRESHOLD).toBe(3)
  })
  it("sin alerta en suma baja", () => {
    const r = scorePhq2({ littleInterest: 1, feelingDown: 1 })
    expect(r.alertRecommended).toBe(false)
  })
})
