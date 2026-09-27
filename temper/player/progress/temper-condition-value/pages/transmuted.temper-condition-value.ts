import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const transmuted = {
  id: "01a0e271-5ad1-7f89-a236-c2d215fcb650",
  type: "page-type/temper-condition-value",
  slug: "transmuted",
  title: "Is Transmuted",
  key: "transmuted",
  conditionField: "temper-condition-field/transmuted",
  displayOrder: 0,
} as const satisfies TemperConditionValue
