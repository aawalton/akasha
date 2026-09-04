import type { TextProperty } from "@akasha/pages-system/text-property"

export type EnchantHeader = string

export const enchantHeader = {
  id: "01a05fcd-f54d-710a-8023-d540525e87cd",
  pageTypeSlug: "text-property",
  slug: "enchant-header",
  propertySlug: "enchant-header",
  definition: "the line an item's enchantment is shown under",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
