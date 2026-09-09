import type { NumberProperty } from "@akasha/pages/number-property"

export type ItemId = number

export const itemId = {
  id: "01a05fba-ce3a-7c82-9d6b-13125cf66f30",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "item-id",
  propertySlug: "item-id",
  definition: "the number The Elder Scrolls Online names an item by",
  max: null,
} as const satisfies NumberProperty
