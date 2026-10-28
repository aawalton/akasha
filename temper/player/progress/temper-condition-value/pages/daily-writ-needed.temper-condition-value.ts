import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const dailyWritNeeded = {
  id: "01a183d2-67a2-77bc-897f-ba5ca214299d",
  type: "page-type/temper-condition-value",
  slug: "daily-writ-needed",
  title: "Is Needed For A Daily Writ",
  key: "daily-writ-needed",
  conditionField: "temper-condition-field/daily-writ-needed",
  displayOrder: 0,
  createdAt: "2026-10-28T18:42:46.817Z",
  updatedAt: "2026-10-28T18:42:46.817Z",
} as const satisfies TemperConditionValue
