import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoAchievementId = {
  id: "01a06168-7245-7001-957c-7cc68ba0a87c",
  type: "page-type/number-property",
  slug: "eso-achievement-id",
  propertySlug: "eso-achievement-id",
  definition: "the number The Elder Scrolls Online gives an achievement",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
