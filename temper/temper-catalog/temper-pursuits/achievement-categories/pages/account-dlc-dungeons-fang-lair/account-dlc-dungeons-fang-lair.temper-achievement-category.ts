import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsFangLair = {
  id: "01a06168-7249-7012-af7f-4bbf638f8942",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-fang-lair",
  title: "Fang Lair",
  category: "account",
  displayOrder: 14,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
