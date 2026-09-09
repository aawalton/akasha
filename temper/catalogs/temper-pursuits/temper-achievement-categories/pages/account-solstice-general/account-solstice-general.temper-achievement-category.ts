import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountSolsticeGeneral = {
  id: "01a06168-724d-700a-92cf-66d5d7652bc3",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-solstice-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
