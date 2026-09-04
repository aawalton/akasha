import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountTrialsKynesAegis = {
  id: "01a06168-724b-7001-9191-a53f5c73a643",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-trials-kynes-aegis",
  title: "Kyne's Aegis",
  category: "account",
  displayOrder: 7,
  parent: "account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
