import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCraftingWoodworking = {
  id: "01a06168-7247-7010-8606-7a1057093730",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-crafting-woodworking",
  title: "Woodworking",
  category: "account",
  displayOrder: 7,
  parent: "account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
