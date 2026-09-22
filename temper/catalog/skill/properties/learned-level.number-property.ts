import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const learnedLevel = {
  id: "01a05fca-cb83-7f8c-9b07-6dcd5c56c193",
  type: "page-type/number-property",
  slug: "learned-level",
  propertySlug: "learned-level",
  definition: "the character level at which a skill is learned",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
