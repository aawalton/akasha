import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDungeonsDirefrostKeep = {
  id: "01a06168-7248-700d-8398-79689877703e",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dungeons-direfrost-keep",
  title: "Direfrost Keep",
  category: "account",
  displayOrder: 12,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
