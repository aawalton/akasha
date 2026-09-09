import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCraftingEnchanting = {
  id: "01a06168-7247-700d-9799-7c8f71953593",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-crafting-enchanting",
  title: "Enchanting",
  category: "account",
  displayOrder: 4,
  parent: "account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
