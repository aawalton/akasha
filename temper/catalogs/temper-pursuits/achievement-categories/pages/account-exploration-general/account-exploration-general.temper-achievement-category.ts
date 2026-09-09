import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountExplorationGeneral = {
  id: "01a06168-724b-700f-ab31-a4f89cfab2ba",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-exploration-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
