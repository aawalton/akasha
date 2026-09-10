import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ActivationEffectType = string

export const activationEffectType = {
  id: "01a05fcd-f548-7652-9174-37322bc01700",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "activation-effect-type",
  propertySlug: "effect-type",
  definition: "what firing a skill does to whoever it lands on",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
