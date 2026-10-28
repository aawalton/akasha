import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const dailyWritNeeded = {
  id: "01a183d2-67a2-79b3-8893-7cbdb978b4b2",
  type: "page-type/temper-condition-field",
  slug: "daily-writ-needed",
  title: "Needed For A Daily Writ",
  key: "dailyWritNeeded",
  description:
    "A crafted item must fulfil a condition of a daily crafting writ the character still holds where the value is `daily-writ-needed`, and must fulfil none where the value is `not-daily-writ-needed`. An item nobody crafted is never needed for a daily writ.",
  createdAt: "2026-10-28T18:42:46.817Z",
  updatedAt: "2026-10-28T18:42:46.817Z",
} as const satisfies TemperConditionField
