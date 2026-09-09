import type { TextProperty } from "@akasha/pages/text-property"

export type EnchantDescription = string

export const enchantDescription = {
  id: "01a05fcd-f54d-7b3a-87cd-5e3397dc87cb",
  pageTypeSlug: "text-property",
  slug: "enchant-description",
  propertySlug: "enchant-description",
  definition: "what the enchantment on an item does",
  maxLength: 1000,
  nameFormat: null,
} as const satisfies TextProperty
