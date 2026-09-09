import type { NumberProperty } from "@akasha/pages/number-property"

export type TraitTypeRange = number

export const traitTypeRange = {
  id: "01a05fcb-fd32-7977-ac60-f00e6fea58f4",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "trait-type-range",
  propertySlug: "trait-type-range",
  definition: "one end of a run of trait numbers",
  max: null,
} as const satisfies NumberProperty
