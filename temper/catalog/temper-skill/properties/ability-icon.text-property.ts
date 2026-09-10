import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type AbilityIcon = string

export const abilityIcon = {
  id: "01a05fca-cb7e-75ad-ab06-6b66e98a41e9",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "ability-icon",
  propertySlug: "ability-icon",
  definition: "the icon the skill a grimoire grants is shown with",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
