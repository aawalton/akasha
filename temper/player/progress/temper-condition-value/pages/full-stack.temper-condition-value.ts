import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const fullStack = {
  id: "01a0e271-5ad0-7152-93d9-50c1e2109501",
  type: "page-type/temper-condition-value",
  slug: "full-stack",
  title: "Full Stack",
  key: "full",
  conditionField: "temper-condition-field/stack-fullness",
  displayOrder: 0,
} as const satisfies TemperConditionValue
