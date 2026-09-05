import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const location = {
  id: "01a07209-6b51-7e18-bdfa-5b44a01a5e32",
  pageTypeSlug: "temper-condition-field",
  slug: "location",
  title: "Location",
  key: "location",
  description:
    "An item's inventory location must appear in the list of location ids stated, covering worn, backpack, bank, craft bag, housing storage, house, companion and guild bank.",
} as const satisfies TemperConditionField
