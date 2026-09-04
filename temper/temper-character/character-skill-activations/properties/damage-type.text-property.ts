import type { TextProperty } from "@akasha/pages-system/text-property"

export type DamageType = string

export const damageType = {
  id: "01a05fcd-f549-776e-8c14-650e3911df93",
  pageTypeSlug: "text-property",
  slug: "damage-type",
  propertySlug: "damage-type",
  definition: "the flavour of damage an effect deals",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
