import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/temper-achievement-category.page-type.types.ts"

export const accountThievesGuildQuests = {
  id: "01a06168-7251-7004-b16c-59e539e0e754",
  type: "temper-achievement-category",
  slug: "account-thieves-guild-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "account-thieves-guild",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
