import type { TemperRuleGoal } from "akasha/temper/progressions/temper-rule-goals/temper-rule-goal.page-type.types.ts"

export const sell = {
  id: "01a071f5-ae75-7ad7-ab17-ab56df88bf7f",
  type: "temper-rule-goal",
  slug: "sell",
  title: "Sell",
  description: "Keeps the item to turn into gold.",
  displayOrder: 7,
} as const satisfies TemperRuleGoal
