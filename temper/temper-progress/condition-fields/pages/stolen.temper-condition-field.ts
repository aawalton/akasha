import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const stolen = {
  id: "01a07209-6b53-79c6-bc43-1fb7b950c67c",
  pageTypeSlug: "temper-condition-field",
  slug: "stolen",
  title: "Stolen",
  key: "stolen",
  description:
    "An item's stolen flag must be true where the value is `stolen` and false where the value is `not-stolen`.",
} as const satisfies TemperConditionField
