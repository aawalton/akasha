import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDragonholdQuests = {
  id: "01a06168-7250-7010-b200-9b417e1e847f",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dragonhold-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "account-dragonhold",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
