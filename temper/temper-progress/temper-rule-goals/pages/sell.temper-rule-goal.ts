import type { TemperRuleGoal } from "../temper-rule-goal.page-type.ts"

export const sell = {
  id: "01a071f5-ae75-7ad7-ab17-ab56df88bf7f",
  pageTypeSlug: "temper-rule-goal",
  slug: "sell",
  title: "Sell",
  description: "Keeps the item to turn into gold.",
  displayOrder: 7,
} as const satisfies TemperRuleGoal
