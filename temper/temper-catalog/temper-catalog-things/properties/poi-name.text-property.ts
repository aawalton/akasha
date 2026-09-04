import type { TextProperty } from "@akasha/pages-system/text-property"

export type PoiName = string

export const poiName = {
  id: "01a06167-3f9b-7007-b116-a80586b1a409",
  pageTypeSlug: "text-property",
  slug: "poi-name",
  propertySlug: "poi-name",
  definition: "the name a point of interest is shown under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
