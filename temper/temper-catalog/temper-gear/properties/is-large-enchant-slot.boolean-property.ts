import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type IsLargeEnchantSlot = boolean

export const isLargeEnchantSlot = {
  id: "01a05fd1-d43b-7ecc-85be-65ebd4600342",
  pageTypeSlug: "boolean-property",
  slug: "is-large-enchant-slot",
  propertySlug: "is-large-enchant-slot",
  definition: "whether a piece of this kind takes the larger glyph",
} as const satisfies BooleanProperty
