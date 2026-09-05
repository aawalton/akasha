import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const itemNamePattern = {
  id: "01a07209-6b51-7d01-9520-ca4b308156ea",
  pageTypeSlug: "temper-condition-field",
  slug: "item-name-pattern",
  title: "Item Name Pattern",
  key: "itemNamePattern",
  description:
    "An item's name, lowercased, must hold every unnegated token of the pattern and none of the tokens prefixed with `-`, where a quoted run counts as one token.",
} as const satisfies TemperConditionField
