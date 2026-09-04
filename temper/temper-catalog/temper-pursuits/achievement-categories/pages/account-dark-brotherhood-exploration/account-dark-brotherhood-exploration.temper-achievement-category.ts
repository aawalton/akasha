import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDarkBrotherhoodExploration = {
  id: "01a06168-7250-701c-b02b-4a2142393de9",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dark-brotherhood-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "account-dark-brotherhood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
