import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const baseName = {
  id: "01a05fca-cb81-77df-9bb1-c81f1135aeb9",
  type: "page-type/text-property",
  slug: "base-name",
  propertySlug: "base-name",
  definition: "the name a skill's morphs share",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
