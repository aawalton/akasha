import type { TemperConditionField } from "akasha/temper/progressions/temper-condition-fields/temper-condition-field.page-type.types.ts"

export const setSourceTypes = {
  id: "01a07209-6b53-796a-b671-0a4f92c2dd86",
  type: "temper-condition-field",
  slug: "set-source-types",
  title: "Set Source Types",
  key: "setSourceTypes",
  description:
    "An item's set number is mapped to a set source category, which must appear in the list stated, and an item carrying no set number skips this check.",
} as const satisfies TemperConditionField
