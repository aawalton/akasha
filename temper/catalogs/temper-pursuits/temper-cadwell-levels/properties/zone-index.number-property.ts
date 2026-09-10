import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type ZoneIndex = number

export const zoneIndex = {
  id: "01a0616b-2cdd-7000-9d49-3cf21883fea8",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "zone-index",
  propertySlug: "zone-index",
  definition: "where a zone falls in the list Cadwell names for a level",
  max: null,
} as const satisfies NumberProperty
