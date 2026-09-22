import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoAllianceId = {
  id: "01a05fc4-7a92-771a-acd9-1c63e6968701",
  type: "page-type/number-property",
  slug: "eso-alliance-id",
  propertySlug: "eso-alliance-id",
  definition: "an alliance's number in The Elder Scrolls Online",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
