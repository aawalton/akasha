import type { TextProperty } from "@akasha/pages/text-property"

export type Abbreviation = string

export const abbreviation = {
  id: "01a05fce-1852-79ad-a22e-48e2939f64f0",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "abbreviation",
  propertySlug: "abbreviation",
  definition: "the short form a name is written by",
  maxLength: 10,
  nameFormat: null,
} as const satisfies TextProperty
