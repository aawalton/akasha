import type { TemperRuleGoal } from "akasha/temper/player/progress/temper-rule-goal/temper-rule-goal.page-type.types.ts"

export const sell = {
  id: "01a071f5-ae75-7ad7-ab17-ab56df88bf7f",
  type: "page-type/temper-rule-goal",
  slug: "sell",
  title: "Sell",
  description: "Keeps the item to turn into gold.",
  displayOrder: 7,
  createdAt: "2026-09-05T14:25:21.525Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperRuleGoal
