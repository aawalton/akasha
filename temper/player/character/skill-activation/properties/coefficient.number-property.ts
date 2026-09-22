import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const coefficient = {
  id: "01a05fcd-f548-778c-a2fa-4da3aa0c7663",
  type: "page-type/number-property",
  slug: "coefficient",
  propertySlug: "coefficient",
  definition: "the multiplier for the number an effect reads",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
