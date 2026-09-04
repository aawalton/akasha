import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TraitType = number

export const traitType = {
  id: "01a05fcd-f556-7ec4-8bed-a3a7e7b01305",
  pageTypeSlug: "number-property",
  slug: "trait-type",
  propertySlug: "trait-type",
  definition: "the trait worked into an item",
  max: null,
} as const satisfies NumberProperty
