import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCraftingGeneral = {
  id: "01a06168-7247-7009-a6cf-68e40a836021",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-crafting-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
