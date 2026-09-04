import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCharacterSkyshards = {
  id: "01a06168-7246-700a-939b-9b598b83460e",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-character-skyshards",
  title: "Skyshards",
  category: "account",
  displayOrder: 4,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
