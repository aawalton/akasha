import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const abilityIcon = {
  id: "01a05fca-cb7e-75ad-ab06-6b66e98a41e9",
  type: "page-type/text-property",
  slug: "ability-icon",
  propertySlug: "ability-icon",
  definition: "the icon of the skill a grimoire grants",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
