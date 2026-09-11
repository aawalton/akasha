import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsBalSunnar = {
  id: "01a06168-7249-7005-8b32-089db9b1e536",
  type: "temper-achievement-category",
  slug: "account-dlc-dungeons-bal-sunnar",
  title: "Bal Sunnar",
  category: "account",
  displayOrder: 1,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
