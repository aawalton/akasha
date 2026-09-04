import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountThievesGuildExploration = {
  id: "01a06168-7251-7003-824e-c58d491094bc",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-thieves-guild-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "account-thieves-guild",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
