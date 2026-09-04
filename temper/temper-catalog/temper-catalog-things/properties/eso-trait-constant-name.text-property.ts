import type { TextProperty } from "@akasha/pages-system/text-property"

export type EsoTraitConstantName = string

export const esoTraitConstantName = {
  id: "01a05fb0-3cec-795c-95ad-9ceda7a30724",
  pageTypeSlug: "text-property",
  slug: "eso-trait-constant-name",
  propertySlug: "eso-trait-constant-name",
  definition: "the constant The Elder Scrolls Online names a trait by in its own code",
  max: 200,
  nameFormatSlug: "name-format/upper-snake-case",
} as const satisfies TextProperty
