import type { TextProperty } from "@akasha/pages-system/text-property"

export type EsoEnchantConstantName = string

export const esoEnchantConstantName = {
  id: "01a05fcc-41f2-79fd-b6e5-16cff264ed35",
  pageTypeSlug: "text-property",
  slug: "eso-enchant-constant-name",
  propertySlug: "eso-enchant-constant-name",
  definition: "the constant The Elder Scrolls Online names an enchant by in its own code",
  max: 200,
  nameFormatSlug: "name-format/upper-snake-case",
} as const satisfies TextProperty
