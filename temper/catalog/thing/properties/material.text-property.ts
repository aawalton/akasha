import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const material = {
  id: "01a05fb0-3ced-788a-a1be-eb9d355ddced",
  type: "page-type/text-property",
  slug: "material",
  propertySlug: "material",
  definition: "what works a trait into a piece",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
