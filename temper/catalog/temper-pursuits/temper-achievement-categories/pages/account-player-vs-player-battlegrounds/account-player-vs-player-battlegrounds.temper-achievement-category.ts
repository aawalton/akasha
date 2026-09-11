import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountPlayerVsPlayerBattlegrounds = {
  id: "01a06168-7247-7007-9238-47e1443b4864",
  type: "temper-achievement-category",
  slug: "account-player-vs-player-battlegrounds",
  title: "Battlegrounds",
  category: "account",
  displayOrder: 2,
  parent: "account-player-vs-player",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
