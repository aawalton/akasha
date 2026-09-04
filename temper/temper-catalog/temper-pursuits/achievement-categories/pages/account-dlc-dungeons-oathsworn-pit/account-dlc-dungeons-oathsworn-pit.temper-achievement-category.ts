import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsOathswornPit = {
  id: "01a06168-724a-7006-8388-7206bf1231bc",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-oathsworn-pit",
  title: "Oathsworn Pit",
  category: "account",
  displayOrder: 25,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
