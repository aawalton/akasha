import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsMoonHunterKeep = {
  id: "01a06168-724a-7003-93fa-fcade27bd3dc",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-moon-hunter-keep",
  title: "Moon Hunter Keep",
  category: "account",
  displayOrder: 22,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
