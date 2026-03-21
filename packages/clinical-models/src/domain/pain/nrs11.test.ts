import { describe, expect, it } from "vitest"
import { isValidNrs11, parseNrs11 } from "./nrs11"

describe("NRS-11", () => {
  it("acepta 0–10 enteros", () => {
    expect(parseNrs11(0)).toBe(0)
    expect(parseNrs11(10)).toBe(10)
    expect(isValidNrs11(5)).toBe(true)
  })
  it("rechaza fuera de rango", () => {
    expect(parseNrs11(-1)).toBeNull()
    expect(parseNrs11(11)).toBeNull()
    expect(parseNrs11(3.5)).toBeNull()
  })
})
