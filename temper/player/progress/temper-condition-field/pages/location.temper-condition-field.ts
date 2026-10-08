import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const location = {
  id: "01a07209-6b51-7e18-bdfa-5b44a01a5e32",
  type: "page-type/temper-condition-field",
  slug: "location",
  title: "Location",
  key: "location",
  description:
    "An item's inventory location must appear in the list of location ids stated, covering worn, backpack, bank, craft bag, housing storage, house, companion and guild bank.",
  createdAt: "2026-09-05T14:46:55.057Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
