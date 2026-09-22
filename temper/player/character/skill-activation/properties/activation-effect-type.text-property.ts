import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const activationEffectType = {
  id: "01a05fcd-f548-7652-9174-37322bc01700",
  type: "page-type/text-property",
  slug: "activation-effect-type",
  propertySlug: "effect-type",
  definition: "what firing a skill does to its target",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
