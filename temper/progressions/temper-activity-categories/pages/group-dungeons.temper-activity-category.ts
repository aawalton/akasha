import type { TemperActivityCategory } from "akasha/temper/progressions/temper-activity-categories/temper-activity-category.page-type.types.ts"

export const groupDungeons = {
  id: "01a05fc9-c60c-7d69-9048-9adc31eebaf1",
  type: "temper-activity-category",
  slug: "group-dungeons",
  title: "Group Dungeons",
  key: "group-dungeons",
  badgeVariant: "orange",
} as const satisfies TemperActivityCategory
