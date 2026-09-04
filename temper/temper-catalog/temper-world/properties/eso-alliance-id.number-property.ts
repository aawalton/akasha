import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoAllianceId = number

export const esoAllianceId = {
  id: "01a05fc4-7a92-771a-acd9-1c63e6968701",
  pageTypeSlug: "number-property",
  slug: "eso-alliance-id",
  propertySlug: "eso-alliance-id",
  definition: "the number The Elder Scrolls Online names an alliance by",
  max: null,
} as const satisfies NumberProperty
