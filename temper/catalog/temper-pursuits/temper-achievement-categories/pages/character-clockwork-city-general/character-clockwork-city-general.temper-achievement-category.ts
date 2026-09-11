import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const characterClockworkCityGeneral = {
  id: "01a06168-7252-7010-a5b8-158eecc215f7",
  type: "temper-achievement-category",
  slug: "character-clockwork-city-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "character-clockwork-city",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
