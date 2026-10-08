import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const soloDifficulty = {
  id: "01a05fc4-7a94-7c7a-a850-0f1b6fb1427d",
  type: "page-type/text-property",
  slug: "solo-difficulty",
  propertySlug: "solo-difficulty",
  definition: "how hard a dungeon is to get through alone",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
  createdAt: "2026-09-02T01:38:27.092Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies TextProperty
