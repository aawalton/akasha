import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const valueType = {
  id: "01a05fe0-8427-7a16-b94d-45c0b105ce0a",
  type: "page-type/text-property",
  slug: "value-type",
  propertySlug: "value-type",
  definition: "whether an effect's value counts as a whole number or as a fraction",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
