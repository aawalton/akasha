import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountNightMarketBosses = {
  id: "01a06168-724c-700d-81f7-5fa7e719d5e1",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-night-market-bosses",
  title: "Bosses",
  category: "account",
  displayOrder: 1,
  parent: "account-night-market",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
