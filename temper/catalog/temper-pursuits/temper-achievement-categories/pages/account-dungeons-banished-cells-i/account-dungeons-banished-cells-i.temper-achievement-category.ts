import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDungeonsBanishedCellsI = {
  id: "01a06168-7248-7003-b3ac-41695039d698",
  type: "temper-achievement-category",
  slug: "account-dungeons-banished-cells-i",
  title: "Banished Cells I",
  category: "account",
  displayOrder: 2,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
