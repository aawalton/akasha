import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const mapX = {
  id: "01a0d5d4-6c7f-75a8-931f-33f5214f3750",
  type: "page-type/number-property",
  slug: "map-x",
  propertySlug: "map-x",
  definition:
    "how far across a map a place sits, from nothing at the left edge to one at the right",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
