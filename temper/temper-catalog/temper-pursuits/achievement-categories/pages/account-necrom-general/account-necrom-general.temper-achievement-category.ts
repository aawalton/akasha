import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountNecromGeneral = {
  id: "01a06168-724d-7019-a7ca-e8253edcea27",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-necrom-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
