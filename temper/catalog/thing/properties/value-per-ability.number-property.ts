import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const valuePerAbility = {
  id: "01a05fe0-8429-70ac-8da2-3994150d0954",
  type: "page-type/number-property",
  slug: "value-per-ability",
  propertySlug: "value-per-ability",
  definition: "what a slotted ability adds to the metric an effect moves",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
