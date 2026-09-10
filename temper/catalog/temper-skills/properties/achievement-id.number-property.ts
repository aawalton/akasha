import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type AchievementId = number

export const achievementId = {
  id: "01a05fca-cb80-7d70-a53f-557dd662d9a8",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "achievement-id",
  propertySlug: "achievement-id",
  definition: "the number The Elder Scrolls Online names an achievement by",
  max: null,
} as const satisfies NumberProperty
