import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoAchievementId = number

export const esoAchievementId = {
  id: "01a06168-7245-7001-957c-7cc68ba0a87c",
  pageTypeSlug: "number-property",
  slug: "eso-achievement-id",
  propertySlug: "eso-achievement-id",
  definition: "the number The Elder Scrolls Online names an achievement by",
  max: null,
} as const satisfies NumberProperty
