import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountMurkmireQuests = {
  id: "01a06168-7250-7015-8442-cfaece98a136",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-murkmire-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "account-murkmire",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
