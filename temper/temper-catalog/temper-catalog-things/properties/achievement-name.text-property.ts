import type { TextProperty } from "@akasha/pages-system/text-property"

export type AchievementName = string

export const achievementName = {
  id: "01a05fca-cb80-7a63-b1f8-d02f76f595f0",
  pageTypeSlug: "text-property",
  slug: "achievement-name",
  propertySlug: "name",
  definition: "the name an achievement is shown under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
