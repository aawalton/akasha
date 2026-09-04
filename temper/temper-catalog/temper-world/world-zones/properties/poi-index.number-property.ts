import type { NumberProperty } from "@akasha/pages-system/number-property"

export type PoiIndex = number

export const poiIndex = {
  id: "01a06167-3f9b-7001-8bff-c78833596c41",
  pageTypeSlug: "number-property",
  slug: "poi-index",
  propertySlug: "poi-index",
  definition: "where a point of interest falls among the places a zone holds",
  max: null,
} as const satisfies NumberProperty
