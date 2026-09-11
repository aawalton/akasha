import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountArenasMaelstromArena = {
  id: "01a06168-724b-700c-bcaa-44073f1e56f8",
  type: "temper-achievement-category",
  slug: "account-arenas-maelstrom-arena",
  title: "Maelstrom Arena",
  category: "account",
  displayOrder: 2,
  parent: "account-arenas",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
