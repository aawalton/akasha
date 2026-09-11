import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const characterThievesGuild = {
  id: "01a06168-7252-7013-90ec-4ead953f0cc9",
  type: "temper-achievement-category",
  slug: "character-thieves-guild",
  title: "Thieves Guild",
  category: "character",
  displayOrder: 17,
} as const satisfies TemperAchievementCategory
