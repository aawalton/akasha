import type { TextProperty } from "@akasha/pages-system/text-property"

export type AbilityIcon = string

export const abilityIcon = {
  id: "01a05fca-cb7e-75ad-ab06-6b66e98a41e9",
  pageTypeSlug: "text-property",
  slug: "ability-icon",
  propertySlug: "ability-icon",
  definition: "the icon the skill a grimoire grants is shown with",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
