import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ItemTypes = number

export const itemTypes = {
  id: "01a05fcb-fd30-7913-a772-74f95fdc3689",
  pageTypeSlug: "number-property",
  slug: "item-types",
  propertySlug: "item-types",
  definition: "an item type The Elder Scrolls Online numbers",
  max: null,
} as const satisfies NumberProperty
