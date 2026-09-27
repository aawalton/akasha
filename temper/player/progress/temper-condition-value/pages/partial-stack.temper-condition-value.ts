import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const partialStack = {
  id: "01a0e271-5ad1-78d1-b716-6ddcb1ffeb3a",
  type: "page-type/temper-condition-value",
  slug: "partial-stack",
  title: "Partial Stack",
  key: "partial",
  conditionField: "temper-condition-field/stack-fullness",
  displayOrder: 1,
} as const satisfies TemperConditionValue
