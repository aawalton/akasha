import type { TemperAchievementCategory } from "akasha/temper/catalog/temper-pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCraftingBlacksmithing = {
  id: "01a06168-7247-700b-b1f4-ab15514f449d",
  type: "page-type/temper-achievement-category",
  slug: "account-crafting-blacksmithing",
  title: "Blacksmithing",
  category: "account",
  displayOrder: 2,
  parent: "account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
