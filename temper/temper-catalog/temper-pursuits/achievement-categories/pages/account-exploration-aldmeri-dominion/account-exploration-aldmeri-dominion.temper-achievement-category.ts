import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountExplorationAldmeriDominion = {
  id: "01a06168-724b-7010-86bb-6618efdd799a",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-exploration-aldmeri-dominion",
  title: "Aldmeri Dominion",
  category: "account",
  displayOrder: 1,
  parent: "account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
