import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const enchantHeader = {
  id: "01a05fcd-f54d-710a-8023-d540525e87cd",
  type: "page-type/text-property",
  slug: "enchant-header",
  propertySlug: "enchant-header",
  definition: "the heading above an item's enchantment",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
