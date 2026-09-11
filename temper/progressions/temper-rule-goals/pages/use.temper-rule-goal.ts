import type { TemperRuleGoal } from "akasha/temper/progressions/temper-rule-goals/temper-rule-goal.page-type.types.ts"

export const use = {
  id: "01a071f5-ae76-7ebc-af50-78d87e1171a2",
  type: "temper-rule-goal",
  slug: "use",
  title: "Use",
  description: "Keeps the item to be used up.",
  displayOrder: 4,
} as const satisfies TemperRuleGoal
