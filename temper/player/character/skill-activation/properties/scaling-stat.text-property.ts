import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const scalingStat = {
  id: "01a05fcd-f54a-75a0-bc25-2cecd3de2578",
  type: "page-type/text-property",
  slug: "scaling-stat",
  propertySlug: "scaling-stat",
  definition: "the character number from which an effect is worked out",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
