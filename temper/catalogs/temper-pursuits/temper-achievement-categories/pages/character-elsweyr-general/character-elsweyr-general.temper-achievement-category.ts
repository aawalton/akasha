import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const characterElsweyrGeneral = {
  id: "01a06168-7252-7002-8814-ef498077280a",
  pageTypeSlug: "temper-achievement-category",
  slug: "character-elsweyr-general",
  title: "General",
  category: "character",
  displayOrder: 0,
  parent: "character-elsweyr",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
