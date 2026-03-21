/**
 * Foros inteligentes como intervención mediada por TCC (CBT).
 */
export type CbtForumStage = "psychoeducation" | "cognitive" | "behavioral" | "relapse_prevention"

export interface CbtModeratedThread {
  readonly id: string
  readonly title: string
  readonly stage: CbtForumStage
  readonly facilitatorPrompt: string
  readonly participantIds: readonly string[]
}

export function suggestNextStage(current: CbtForumStage): CbtForumStage {
  const order: CbtForumStage[] = [
    "psychoeducation",
    "cognitive",
    "behavioral",
    "relapse_prevention",
  ]
  const i = order.indexOf(current)
  return order[Math.min(i + 1, order.length - 1)]
}
