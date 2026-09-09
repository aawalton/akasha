import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterDragonholdQuests = {
  id: "01a06168-7252-700c-8850-4f9e60392dd0",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-dragonhold-quests",
  title: "Quests",
  category: "character",
  displayOrder: 1,
  parent: "character-dragonhold",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
