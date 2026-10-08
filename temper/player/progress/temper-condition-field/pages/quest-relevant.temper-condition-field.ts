import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const questRelevant = {
  id: "01a07209-6b52-7d14-ae71-270876892ccc",
  type: "page-type/temper-condition-field",
  slug: "quest-relevant",
  title: "Quest-Relevant Status",
  key: "questRelevant",
  description:
    "An item's quest-relevant flag must be true where the value is `quest-relevant` and false where the value is `not-quest-relevant`.",
  createdAt: "2026-09-05T14:46:55.058Z",
  updatedAt: "2026-09-27T10:00:08.000Z",
} as const satisfies TemperConditionField
