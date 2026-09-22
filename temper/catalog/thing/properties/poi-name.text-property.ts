import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const poiName = {
  id: "01a06167-3f9b-7007-b116-a80586b1a409",
  type: "page-type/text-property",
  slug: "poi-name",
  propertySlug: "poi-name",
  definition: "a point of interest's name",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
