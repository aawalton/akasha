import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const scalingStat = {
  id: "01a05fcd-f54a-75a0-bc25-2cecd3de2578",
  type: "text-property",
  slug: "scaling-stat",
  propertySlug: "scaling-stat",
  definition: "the character number an effect is worked out from",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
