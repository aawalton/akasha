import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const questRelevant = {
  id: "01a0e271-5ad1-77b7-aca7-57bdfddf3aec",
  type: "page-type/temper-condition-value",
  slug: "quest-relevant",
  title: "Is Quest-Relevant",
  key: "quest-relevant",
  conditionField: "temper-condition-field/quest-relevant",
  displayOrder: 0,
} as const satisfies TemperConditionValue
