import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const valuePerPiece = {
  id: "01a05fe0-8428-7c08-a3df-30db8ae9ad6a",
  type: "page-type/number-property",
  slug: "value-per-piece",
  propertySlug: "value-per-piece",
  definition: "what a piece of armor adds to the metric an effect moves",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
