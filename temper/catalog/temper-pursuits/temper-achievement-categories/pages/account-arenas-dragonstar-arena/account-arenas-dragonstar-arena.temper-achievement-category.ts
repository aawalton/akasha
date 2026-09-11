import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountArenasDragonstarArena = {
  id: "01a06168-724b-700b-9abc-291da6090401",
  type: "temper-achievement-category",
  slug: "account-arenas-dragonstar-arena",
  title: "Dragonstar Arena",
  category: "account",
  displayOrder: 1,
  parent: "account-arenas",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
