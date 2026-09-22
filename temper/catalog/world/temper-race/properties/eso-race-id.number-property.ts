import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoRaceId = {
  id: "01a05fc4-7a92-7d70-af85-78a934e9fa71",
  type: "page-type/number-property",
  slug: "eso-race-id",
  propertySlug: "eso-race-id",
  definition: "a race's number in The Elder Scrolls Online",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
