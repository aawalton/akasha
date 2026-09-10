import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Material = string

export const material = {
  id: "01a05fb0-3ced-788a-a1be-eb9d355ddced",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "material",
  propertySlug: "material",
  definition: "what a trait is worked into a piece with",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
