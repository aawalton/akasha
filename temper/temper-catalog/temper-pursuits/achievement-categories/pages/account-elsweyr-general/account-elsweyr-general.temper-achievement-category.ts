import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountElsweyrGeneral = {
  id: "01a06168-724f-7005-b23d-265beba49132",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-elsweyr-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-elsweyr",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
