import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notQuestRelevant = {
  id: "01a0e271-5ad0-77ae-b57a-b93d1d7b18d2",
  type: "page-type/temper-condition-value",
  slug: "not-quest-relevant",
  title: "Is Not Quest-Relevant",
  key: "not-quest-relevant",
  conditionField: "temper-condition-field/quest-relevant",
  displayOrder: 1,
} as const satisfies TemperConditionValue
