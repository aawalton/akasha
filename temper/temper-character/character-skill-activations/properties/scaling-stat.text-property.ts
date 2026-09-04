import type { TextProperty } from "@akasha/pages-system/text-property"

export type ScalingStat = string

export const scalingStat = {
  id: "01a05fcd-f54a-75a0-bc25-2cecd3de2578",
  pageTypeSlug: "text-property",
  slug: "scaling-stat",
  propertySlug: "scaling-stat",
  definition: "the character number an effect is worked out from",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
