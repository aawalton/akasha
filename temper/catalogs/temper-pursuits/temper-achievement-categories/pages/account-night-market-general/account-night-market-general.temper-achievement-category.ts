import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountNightMarketGeneral = {
  id: "01a06168-724c-700c-86c4-b8acab195a20",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-night-market-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-night-market",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
