import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notDailyWritNeeded = {
  id: "01a183d2-67a2-7d47-b549-81ea3f851740",
  type: "page-type/temper-condition-value",
  slug: "not-daily-writ-needed",
  title: "Is Not Needed For A Daily Writ",
  key: "not-daily-writ-needed",
  conditionField: "temper-condition-field/daily-writ-needed",
  displayOrder: 1,
  createdAt: "2026-10-28T18:42:46.817Z",
  updatedAt: "2026-10-28T18:42:46.817Z",
} as const satisfies TemperConditionValue
