import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type ValuePerAbility = number

export const valuePerAbility = {
  id: "01a05fe0-8429-70ac-8da2-3994150d0954",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "value-per-ability",
  propertySlug: "value-per-ability",
  definition: "what one slotted ability adds to the metric an effect moves",
  max: null,
} as const satisfies NumberProperty
