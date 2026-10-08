import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notKnown = {
  id: "01a0e271-5ad0-798f-bad3-9d1628e6cabe",
  type: "page-type/temper-condition-value",
  slug: "not-known",
  title: "Is Not Known",
  key: "not-known",
  conditionField: "temper-condition-field/known",
  displayOrder: 1,
  createdAt: "2026-09-27T10:37:54.768Z",
  updatedAt: "2026-09-27T10:37:57.000Z",
} as const satisfies TemperConditionValue
