import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notLocked = {
  id: "01a0e271-5ad0-78c8-92d9-21546502e84b",
  type: "page-type/temper-condition-value",
  slug: "not-locked",
  title: "Is Not Locked",
  key: "not-locked",
  conditionField: "temper-condition-field/locked",
  displayOrder: 1,
  createdAt: "2026-09-27T10:37:54.768Z",
  updatedAt: "2026-09-27T10:37:57.000Z",
} as const satisfies TemperConditionValue
