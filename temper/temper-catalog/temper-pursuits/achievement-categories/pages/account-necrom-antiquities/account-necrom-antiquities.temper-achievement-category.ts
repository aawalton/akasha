import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountNecromAntiquities = {
  id: "01a06168-724e-7002-b540-cd8ec86b3f79",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-necrom-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 3,
  parent: "account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
