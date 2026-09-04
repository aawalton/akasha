import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoZoneId = number

export const esoZoneId = {
  id: "01a06167-3f9a-7000-893b-ab22be7b8210",
  pageTypeSlug: "number-property",
  slug: "eso-zone-id",
  propertySlug: "eso-zone-id",
  definition: "the number the game gives a zone",
  max: null,
} as const satisfies NumberProperty
