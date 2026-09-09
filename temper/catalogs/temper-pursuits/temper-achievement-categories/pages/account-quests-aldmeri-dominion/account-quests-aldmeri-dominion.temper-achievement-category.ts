import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountQuestsAldmeriDominion = {
  id: "01a06168-724c-7005-b984-829e8df5469d",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-quests-aldmeri-dominion",
  title: "Aldmeri Dominion",
  category: "account",
  displayOrder: 2,
  parent: "account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
