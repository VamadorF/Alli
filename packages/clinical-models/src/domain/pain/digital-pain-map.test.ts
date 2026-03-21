import { describe, expect, it } from "vitest"
import {
  DORSAL_REGION_COUNT,
  TOPOLOGY_VECTOR_LENGTH,
  VENTRAL_REGION_COUNT,
  createEmptyTopology,
  dorsalCellsForRegion,
  dorsalRegionSlotRange,
  ventralRegionSlotRange,
} from "./digital-pain-map"

describe("Mapeo digital del dolor", () => {
  it("vector vacío tiene 316 celdas", () => {
    expect(createEmptyTopology().length).toBe(TOPOLOGY_VECTOR_LENGTH)
  })
  it("cobertura ventral + dorsal sin solapamiento", () => {
    const lastVentral = ventralRegionSlotRange(VENTRAL_REGION_COUNT - 1)[1]
    const firstDorsal = dorsalRegionSlotRange(0)[0]
    expect(firstDorsal).toBe(lastVentral)
    const lastDorsal = dorsalRegionSlotRange(DORSAL_REGION_COUNT - 1)[1]
    expect(lastDorsal).toBe(TOPOLOGY_VECTOR_LENGTH)
  })
  it("suma de celdas dorsales = 148", () => {
    let sum = 0
    for (let i = 0; i < DORSAL_REGION_COUNT; i++) {
      sum += dorsalCellsForRegion(i)
    }
    expect(sum).toBe(148)
  })
})
