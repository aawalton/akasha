import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountNightMarketQuests = {
  id: "01a06168-724c-700f-8158-53d351c66a81",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-night-market-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "account-night-market",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
