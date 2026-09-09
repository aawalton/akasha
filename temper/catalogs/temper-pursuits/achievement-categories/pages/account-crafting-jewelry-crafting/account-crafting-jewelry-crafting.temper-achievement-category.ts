import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCraftingJewelryCrafting = {
  id: "01a06168-7247-700e-849a-0cb4d4650725",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-crafting-jewelry-crafting",
  title: "Jewelry Crafting",
  category: "account",
  displayOrder: 5,
  parent: "account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
