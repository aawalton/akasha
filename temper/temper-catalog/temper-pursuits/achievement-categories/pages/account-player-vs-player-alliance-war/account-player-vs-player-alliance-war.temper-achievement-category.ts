import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountPlayerVsPlayerAllianceWar = {
  id: "01a06168-7247-7006-8f49-a0e47afa52f3",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-player-vs-player-alliance-war",
  title: "Alliance War",
  category: "account",
  displayOrder: 1,
  parent: "account-player-vs-player",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
