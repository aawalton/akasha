import type { TextProperty } from "@akasha/pages-system/text-property"

export type ActivationEffectType = string

export const activationEffectType = {
  id: "01a05fcd-f548-7652-9174-37322bc01700",
  pageTypeSlug: "text-property",
  slug: "activation-effect-type",
  propertySlug: "effect-type",
  definition: "what firing a skill does to whoever it lands on",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
