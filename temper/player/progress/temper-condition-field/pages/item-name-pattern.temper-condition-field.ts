import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const itemNamePattern = {
  id: "01a07209-6b51-7d01-9520-ca4b308156ea",
  type: "page-type/temper-condition-field",
  slug: "item-name-pattern",
  title: "Item Name",
  key: "itemNamePattern",
  description:
    "An item's name, lowercased, must hold every unnegated token of the pattern and none of the tokens prefixed with `-`, where a quoted run counts as one token.",
  createdAt: "2026-09-05T14:46:55.057Z",
  updatedAt: "2026-09-27T10:00:08.000Z",
} as const satisfies TemperConditionField
