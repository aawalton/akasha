import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const esoStatValuePart = {
  id: "01a0de62-56d0-7b94-975d-80ffbb1181e0",
  type: "page-type/text-property",
  slug: "eso-stat-value-part",
  propertySlug: "eso-stat-value-part",
  definition: "which part of the game's advanced stat a stat is, the flat part or the percent",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
