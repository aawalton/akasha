import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notTransmuted = {
  id: "01a0e271-5ad0-787d-97b7-7d95c1fc1916",
  type: "page-type/temper-condition-value",
  slug: "not-transmuted",
  title: "Is Not Transmuted",
  key: "not-transmuted",
  conditionField: "temper-condition-field/transmuted",
  displayOrder: 1,
  createdAt: "2026-09-27T10:37:54.768Z",
  updatedAt: "2026-09-27T10:37:57.000Z",
} as const satisfies TemperConditionValue
