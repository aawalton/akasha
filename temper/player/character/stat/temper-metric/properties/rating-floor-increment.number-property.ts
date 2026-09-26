import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const ratingFloorIncrement = {
  id: "01a0deff-4b82-7d6f-9138-58faf4474ad5",
  type: "page-type/number-property",
  slug: "rating-floor-increment",
  propertySlug: "rating-floor-increment",
  definition: "the step a rated stat's chance is rounded down to",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
