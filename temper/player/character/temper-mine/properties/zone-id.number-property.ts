import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const zoneId = {
  id: "01a05fcd-f556-7772-87a0-2f629e7c9527",
  type: "page-type/number-property",
  slug: "zone-id",
  propertySlug: "zone-id",
  definition: "the number the game gives a zone",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
