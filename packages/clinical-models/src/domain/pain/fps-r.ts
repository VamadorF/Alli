import { isValidNrs11, type Nrs11Value } from "./nrs11"

/**
 * Escala de Caras del Dolor Revisada (FPS-R): alternativa accesible al NRS.
 * Valores canónicos 0,2,4,6,8,10; aceptamos cualquier entero 0–10 por compatibilidad con UI.
 */
export const FPS_R_CANONICAL: readonly Nrs11Value[] = [0, 2, 4, 6, 8, 10]

export function normalizeFpsRToNrs(value: number): Nrs11Value | null {
  if (!isValidNrs11(value)) return null
  return value as Nrs11Value
}

export function isCanonicalFpsR(value: number): boolean {
  return FPS_R_CANONICAL.includes(value as Nrs11Value)
}
