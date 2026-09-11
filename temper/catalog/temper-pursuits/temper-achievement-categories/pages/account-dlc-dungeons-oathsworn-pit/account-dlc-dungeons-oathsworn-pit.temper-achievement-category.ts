import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsOathswornPit = {
  id: "01a06168-724a-7006-8388-7206bf1231bc",
  type: "temper-achievement-category",
  slug: "account-dlc-dungeons-oathsworn-pit",
  title: "Oathsworn Pit",
  category: "account",
  displayOrder: 25,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
