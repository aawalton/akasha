import type { TemperRuleGoal } from "../temper-rule-goal.page-type.ts"

export const destroy = {
  id: "01a071f5-ae73-7e72-b1b2-025070392cf0",
  pageTypeSlug: "temper-rule-goal",
  slug: "destroy",
  title: "Destroy",
  description: "Keeps nothing, and lets the item go.",
  displayOrder: 8,
} as const satisfies TemperRuleGoal
