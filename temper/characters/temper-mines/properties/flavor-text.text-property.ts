import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const flavorText = {
  id: "01a05fcd-f54e-776c-b0e8-56c34894de30",
  type: "text-property",
  slug: "flavor-text",
  propertySlug: "flavor-text",
  definition: "the lore line printed on an item",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
