import type { TextProperty } from "@akasha/pages-system/text-property"

export type Material = string

export const material = {
  id: "01a05fb0-3ced-788a-a1be-eb9d355ddced",
  pageTypeSlug: "text-property",
  slug: "material",
  propertySlug: "material",
  definition: "what a trait is worked into a piece with",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
