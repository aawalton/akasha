import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCharacterGuilds = {
  id: "01a06168-7246-7007-bc5c-b79e97d847af",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-character-guilds",
  title: "Guilds",
  category: "account",
  displayOrder: 1,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
