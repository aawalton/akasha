import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDungeonsGeneral = {
  id: "01a06168-7248-7001-adbd-3b582484e0f2",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dungeons-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
