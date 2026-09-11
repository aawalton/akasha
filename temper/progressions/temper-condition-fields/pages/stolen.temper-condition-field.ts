import type { TemperConditionField } from "akasha/temper/progressions/temper-condition-fields/temper-condition-field.page-type.types.ts"

export const stolen = {
  id: "01a07209-6b53-79c6-bc43-1fb7b950c67c",
  type: "temper-condition-field",
  slug: "stolen",
  title: "Stolen",
  key: "stolen",
  description:
    "An item's stolen flag must be true where the value is `stolen` and false where the value is `not-stolen`.",
} as const satisfies TemperConditionField
