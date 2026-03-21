import { describe, expect, it } from "vitest"
import { DEFAULT_MINSAL_POLICY, deriveTriageDestination } from "./minsal-triage"

describe("Triaje MINSAL (dominio)", () => {
  it("envía a UEH con banderas rojas", () => {
    expect(
      deriveTriageDestination(
        { nrs: 3, redFlags: true, phq2Total: 0, unstableVitals: false },
        DEFAULT_MINSAL_POLICY,
      ),
    ).toBe("UEH")
  })
  it("NRS alto sin estabilidad alternativa → UEH", () => {
    expect(
      deriveTriageDestination(
        { nrs: 9, redFlags: false, phq2Total: 2, unstableVitals: false },
        DEFAULT_MINSAL_POLICY,
      ),
    ).toBe("UEH")
  })
  it("NRS moderado estable → SAPU por defecto", () => {
    expect(
      deriveTriageDestination(
        { nrs: 5, redFlags: false, phq2Total: 1, unstableVitals: false },
        DEFAULT_MINSAL_POLICY,
      ),
    ).toBe("SAPU")
  })
})
