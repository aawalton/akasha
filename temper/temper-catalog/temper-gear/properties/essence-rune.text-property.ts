import type { TextProperty } from "@akasha/pages/text-property"

export type EssenceRune = string

export const essenceRune = {
  id: "01a05fcc-41f2-7de9-816e-7c90d5a24ce7",
  pageTypeSlug: "text-property",
  slug: "essence-rune",
  propertySlug: "essence-rune",
  definition: "the rune deciding which enchant a glyph carries",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
