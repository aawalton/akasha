import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterElsweyrExploration = {
  id: "01a06168-7252-7003-9593-108c9e4f661b",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-elsweyr-exploration",
  title: "Exploration",
  category: "character",
  displayOrder: 1,
  parent: "character-elsweyr",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
