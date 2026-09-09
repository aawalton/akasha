import type { TextProperty } from "@akasha/pages/text-property"

export type DamageType = string

export const damageType = {
  id: "01a05fcd-f549-776e-8c14-650e3911df93",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "damage-type",
  propertySlug: "damage-type",
  definition: "the flavour of damage an effect deals",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
