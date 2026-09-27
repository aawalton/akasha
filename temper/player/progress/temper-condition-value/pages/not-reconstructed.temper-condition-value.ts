import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notReconstructed = {
  id: "01a0e271-5ad0-70f9-a604-402720b72a7e",
  type: "page-type/temper-condition-value",
  slug: "not-reconstructed",
  title: "Is Not Reconstructed",
  key: "not-reconstructed",
  conditionField: "temper-condition-field/reconstructed",
  displayOrder: 1,
} as const satisfies TemperConditionValue
