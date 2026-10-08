import type { TemperRuleGoal } from "akasha/temper/player/progress/temper-rule-goal/temper-rule-goal.page-type.types.ts"

export const unlock = {
  id: "01a071f5-ae75-7e5f-8fb9-75c8e06177a1",
  type: "page-type/temper-rule-goal",
  slug: "unlock",
  title: "Unlock",
  description: "Keeps the item until the collection the item belongs to is unlocked.",
  displayOrder: 2,
  createdAt: "2026-09-05T14:25:21.525Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperRuleGoal
