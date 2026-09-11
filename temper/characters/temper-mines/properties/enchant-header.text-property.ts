import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const enchantHeader = {
  id: "01a05fcd-f54d-710a-8023-d540525e87cd",
  type: "text-property",
  slug: "enchant-header",
  propertySlug: "enchant-header",
  definition: "the line an item's enchantment is shown under",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
