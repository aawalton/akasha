import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDeadlandsAntiquities = {
  id: "01a06168-7250-7005-bf48-3b5023ac09fd",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-deadlands-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 4,
  parent: "account-deadlands",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
