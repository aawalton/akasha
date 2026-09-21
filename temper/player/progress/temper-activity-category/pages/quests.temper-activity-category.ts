import type { TemperActivityCategory } from "akasha/temper/player/progress/temper-activity-category/temper-activity-category.page-type.types.ts"

export const quests = {
  id: "01a05fc9-c60d-7a10-add4-212dfa438913",
  type: "page-type/temper-activity-category",
  slug: "quests",
  title: "Quests",
  key: "quests",
  badgeVariant: "purple",
} as const satisfies TemperActivityCategory
