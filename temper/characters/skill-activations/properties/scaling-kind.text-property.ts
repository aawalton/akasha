import type { TextProperty } from "@akasha/pages/text-property"

export type ScalingKind = string

export const scalingKind = {
  id: "01a05fcd-f549-7dc9-9a01-64ab56ce9e42",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "scaling-kind",
  propertySlug: "scaling-kind",
  definition: "how an effect is worked out from the number it reads",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
