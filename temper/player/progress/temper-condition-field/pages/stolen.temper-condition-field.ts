import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const stolen = {
  id: "01a07209-6b53-79c6-bc43-1fb7b950c67c",
  type: "page-type/temper-condition-field",
  slug: "stolen",
  title: "Stolen",
  key: "stolen",
  description:
    "An item's stolen flag must be true where the value is `stolen` and false where the value is `not-stolen`.",
  createdAt: "2026-09-05T14:46:55.059Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
