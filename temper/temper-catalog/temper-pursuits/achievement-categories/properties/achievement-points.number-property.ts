import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AchievementPoints = number

export const achievementPoints = {
  id: "01a06168-7245-7002-89a0-dd15ca1f2c94",
  pageTypeSlug: "number-property",
  slug: "achievement-points",
  propertySlug: "achievement-points",
  definition: "the points the game awards a player for earning an achievement",
  max: null,
} as const satisfies NumberProperty
