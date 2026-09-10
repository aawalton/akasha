import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const armorRating = {
  id: "01a05fcd-f54c-74e6-bb9f-b196c110f6d4",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "armor-rating",
  propertySlug: "armor-rating",
  definition: "how much armor an item is worth",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
