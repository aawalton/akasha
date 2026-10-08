import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notBound = {
  id: "01a0e271-5ad0-7f1b-957b-65c77219814a",
  type: "page-type/temper-condition-value",
  slug: "not-bound",
  title: "Is Not Bound",
  key: "not-bound",
  conditionField: "temper-condition-field/bound",
  displayOrder: 1,
  createdAt: "2026-09-27T10:37:54.768Z",
  updatedAt: "2026-09-27T10:37:57.000Z",
} as const satisfies TemperConditionValue
