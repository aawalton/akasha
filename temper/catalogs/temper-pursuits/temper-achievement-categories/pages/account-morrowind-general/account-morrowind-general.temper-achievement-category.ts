import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountMorrowindGeneral = {
  id: "01a06168-724f-700f-ac03-3aeebeff385c",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-morrowind-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-morrowind",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
