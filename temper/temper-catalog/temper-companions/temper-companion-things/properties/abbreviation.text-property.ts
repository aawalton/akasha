import type { TextProperty } from "@akasha/pages-system/text-property"

export type Abbreviation = string

export const abbreviation = {
  id: "01a05fce-1852-79ad-a22e-48e2939f64f0",
  pageTypeSlug: "text-property",
  slug: "abbreviation",
  propertySlug: "abbreviation",
  definition: "the short form a name is written by",
  max: 10,
  nameFormatSlug: null,
} as const satisfies TextProperty
