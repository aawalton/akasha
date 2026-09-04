import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCraftingClothier = {
  id: "01a06168-7247-700c-9f89-173a1c710ad5",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-crafting-clothier",
  title: "Clothier",
  category: "account",
  displayOrder: 3,
  parent: "account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
