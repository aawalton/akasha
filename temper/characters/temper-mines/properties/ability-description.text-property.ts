import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const abilityDescription = {
  id: "01a05fcd-f54b-70b4-b8c8-5a4d01768953",
  type: "text-property",
  slug: "ability-description",
  propertySlug: "ability-description",
  definition: "what an item's own ability does",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
