import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const achievementName = {
  id: "01a05fca-cb80-7a63-b1f8-d02f76f595f0",
  type: "page-type/text-property",
  slug: "achievement-name",
  propertySlug: "name",
  definition: "an achievement's name",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
