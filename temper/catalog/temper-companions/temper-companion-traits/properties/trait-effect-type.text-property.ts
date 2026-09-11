import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const traitEffectType = {
  id: "01a08786-5eff-74dc-8463-bba942e61344",
  type: "text-property",
  slug: "trait-effect-type",
  propertySlug: "effect-type",
  definition: "how a trait's value is read against the metric the trait moves",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
