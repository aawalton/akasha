import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const armorType = {
  id: "01a05fcd-f54c-7e54-b137-1ee0839f485b",
  type: "number-property",
  slug: "armor-type",
  propertySlug: "armor-type",
  definition: "the weight class of armor an item is",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
