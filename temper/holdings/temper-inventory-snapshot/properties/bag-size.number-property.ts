import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const bagSize = {
  id: "01a0675a-f185-7b1f-abf5-b815387da28a",
  type: "page-type/number-property",
  slug: "bag-size",
  propertySlug: "bag-size",
  definition: "how many slots a bag has",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
