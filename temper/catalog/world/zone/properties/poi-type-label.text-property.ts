import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const poiTypeLabel = {
  id: "01a06167-3f9b-7006-b951-0109d7c05944",
  type: "page-type/text-property",
  slug: "poi-type-label",
  propertySlug: "poi-type-label",
  definition: "the name shown for a kind of point of interest",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
