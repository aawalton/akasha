import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountOrsiniumExploration = {
  id: "01a06168-7251-7007-98e9-80e73db57b36",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-orsinium-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "account-orsinium",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
