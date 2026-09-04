import type { TextProperty } from "@akasha/pages-system/text-property"

export type GlyphName = string

export const glyphName = {
  id: "01a05fcc-41f3-7fbf-9f03-9633908e93c8",
  pageTypeSlug: "text-property",
  slug: "glyph-name",
  propertySlug: "glyph-name",
  definition: "what the game calls the glyph an enchant is carried by",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
