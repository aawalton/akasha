import type { TemperRuleGoal } from "akasha/temper/progressions/temper-rule-goals/temper-rule-goal.page-type.types.ts"

export const hoard = {
  id: "01a071f5-ae75-700e-ba16-3d0dbd282cea",
  type: "temper-rule-goal",
  slug: "hoard",
  title: "Hoard",
  description: "Keeps the item in storage against a later need.",
  displayOrder: 6,
} as const satisfies TemperRuleGoal
