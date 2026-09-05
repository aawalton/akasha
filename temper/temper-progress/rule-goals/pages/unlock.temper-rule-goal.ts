import type { TemperRuleGoal } from "../temper-rule-goal.page-type.ts"

export const unlock = {
  id: "01a071f5-ae75-7e5f-8fb9-75c8e06177a1",
  pageTypeSlug: "temper-rule-goal",
  slug: "unlock",
  title: "Unlock",
  description: "Keeps the item until the collection the item belongs to is unlocked.",
  displayOrder: 2,
} as const satisfies TemperRuleGoal
