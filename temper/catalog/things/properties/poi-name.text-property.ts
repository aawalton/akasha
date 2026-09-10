import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type PoiName = string

export const poiName = {
  id: "01a06167-3f9b-7007-b116-a80586b1a409",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "poi-name",
  propertySlug: "poi-name",
  definition: "the name a point of interest is shown under",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
