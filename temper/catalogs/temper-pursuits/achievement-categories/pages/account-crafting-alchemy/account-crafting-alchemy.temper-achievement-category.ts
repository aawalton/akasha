import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCraftingAlchemy = {
  id: "01a06168-7247-700a-85f6-fe4385d516f3",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-crafting-alchemy",
  title: "Alchemy",
  category: "account",
  displayOrder: 1,
  parent: "account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
