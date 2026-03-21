/**
 * Mapeo digital del dolor: vector fijo de 316 celdas booleanas.
 * 24 regiones ventrales (7 celdas c/u = 168) + 26 dorsales (148 celdas repartidas).
 */
export const TOPOLOGY_VECTOR_LENGTH = 316
export const VENTRAL_REGION_COUNT = 24
export const DORSAL_REGION_COUNT = 26
export const VENTRAL_CELLS_PER_REGION = 7
export const VENTRAL_TOTAL_CELLS = VENTRAL_REGION_COUNT * VENTRAL_CELLS_PER_REGION
export const DORSAL_TOTAL_CELLS = TOPOLOGY_VECTOR_LENGTH - VENTRAL_TOTAL_CELLS

export type PainTopologyVector = readonly boolean[] & { readonly __brand: "PainTopologyVector" }

function assertLength(v: readonly boolean[]): void {
  if (v.length !== TOPOLOGY_VECTOR_LENGTH) {
    throw new Error(`Topología inválida: se esperaban ${TOPOLOGY_VECTOR_LENGTH} valores, hay ${v.length}`)
  }
}

/** Reparto dorsal: 18 regiones con 6 celdas y 8 con 5 (total 148). */
export function dorsalCellsForRegion(regionIndex: number): number {
  if (regionIndex < 0 || regionIndex >= DORSAL_REGION_COUNT) {
    throw new Error("regionIndex dorsal fuera de rango")
  }
  return regionIndex < 18 ? 6 : 5
}

export function createEmptyTopology(): boolean[] {
  return Array.from({ length: TOPOLOGY_VECTOR_LENGTH }, () => false)
}

export function toTopologyVector(cells: readonly boolean[]): PainTopologyVector {
  assertLength(cells)
  return cells as unknown as PainTopologyVector
}

/** Índices globales [start, end) para cada región ventral. */
export function ventralRegionSlotRange(regionIndex: number): readonly [number, number] {
  if (regionIndex < 0 || regionIndex >= VENTRAL_REGION_COUNT) {
    throw new Error("regionIndex ventral fuera de rango")
  }
  const start = regionIndex * VENTRAL_CELLS_PER_REGION
  return [start, start + VENTRAL_CELLS_PER_REGION]
}

/** Índices globales [start, end) para cada región dorsal (después del bloque ventral). */
export function dorsalRegionSlotRange(regionIndex: number): readonly [number, number] {
  if (regionIndex < 0 || regionIndex >= DORSAL_REGION_COUNT) {
    throw new Error("regionIndex dorsal fuera de rango")
  }
  let start = VENTRAL_TOTAL_CELLS
  for (let i = 0; i < regionIndex; i++) {
    start += dorsalCellsForRegion(i)
  }
  const end = start + dorsalCellsForRegion(regionIndex)
  return [start, end]
}

export function countActiveCells(topology: readonly boolean[]): number {
  assertLength(topology)
  return topology.filter(Boolean).length
}
