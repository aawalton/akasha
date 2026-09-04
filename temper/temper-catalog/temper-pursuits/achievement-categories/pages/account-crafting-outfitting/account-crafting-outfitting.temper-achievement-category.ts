import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCraftingOutfitting = {
  id: "01a06168-7247-7011-8ab2-99cc09dd83eb",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-crafting-outfitting",
  title: "Outfitting",
  category: "account",
  displayOrder: 8,
  parent: "account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
