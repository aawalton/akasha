import type { TextProperty } from "@akasha/pages-system/text-property"

export type AbilityDescription = string

export const abilityDescription = {
  id: "01a05fcd-f54b-70b4-b8c8-5a4d01768953",
  pageTypeSlug: "text-property",
  slug: "ability-description",
  propertySlug: "ability-description",
  definition: "what an item's own ability does",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
