import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountPlayerVsPlayerGeneral = {
  id: "01a06168-7247-7005-ab35-2d2fd9144a9e",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-player-vs-player-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-player-vs-player",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
