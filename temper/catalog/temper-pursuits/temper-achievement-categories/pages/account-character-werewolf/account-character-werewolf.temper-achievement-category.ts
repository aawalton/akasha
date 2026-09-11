import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountCharacterWerewolf = {
  id: "01a06168-7246-700d-81bb-e800fd1070c3",
  type: "temper-achievement-category",
  slug: "account-character-werewolf",
  title: "Werewolf",
  category: "account",
  displayOrder: 7,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
