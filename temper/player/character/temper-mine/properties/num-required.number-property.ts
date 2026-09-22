import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const numRequired = {
  id: "01a05fcd-f552-747a-9d38-842aa35260d0",
  type: "page-type/number-property",
  slug: "num-required",
  propertySlug: "num-required",
  definition: "how many pieces of a set a bonus needs",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
