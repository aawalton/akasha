import type { TextProperty } from "@akasha/pages/text-property"

export type TraitEffectType = string

export const traitEffectType = {
  id: "01a08786-5eff-74dc-8463-bba942e61344",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "trait-effect-type",
  propertySlug: "effect-type",
  definition: "how a trait's value is read against the metric the trait moves",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
