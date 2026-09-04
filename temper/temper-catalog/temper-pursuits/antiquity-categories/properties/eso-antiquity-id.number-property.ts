import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoAntiquityId = number

export const esoAntiquityId = {
  id: "01a06166-503b-7001-9a08-c1a7507996da",
  pageTypeSlug: "number-property",
  slug: "eso-antiquity-id",
  propertySlug: "eso-antiquity-id",
  definition: "the number The Elder Scrolls Online names an antiquity by",
  max: null,
} as const satisfies NumberProperty
