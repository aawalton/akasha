import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountMarkarthGeneral = {
  id: "01a06168-7250-7007-8338-94c894e53967",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-markarth-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-markarth",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
