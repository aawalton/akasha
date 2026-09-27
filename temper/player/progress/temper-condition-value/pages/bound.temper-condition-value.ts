import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const bound = {
  id: "01a0e271-5ad0-7dcd-9faf-4db2aa39eb79",
  type: "page-type/temper-condition-value",
  slug: "bound",
  title: "Is Bound",
  key: "bound",
  conditionField: "temper-condition-field/bound",
  displayOrder: 0,
} as const satisfies TemperConditionValue
