import type { TextProperty } from "@akasha/pages/text-property"

export type SoloDifficulty = string

export const soloDifficulty = {
  id: "01a05fc4-7a94-7c7a-a850-0f1b6fb1427d",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "solo-difficulty",
  propertySlug: "solo-difficulty",
  definition: "how hard a dungeon is to get through alone",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
