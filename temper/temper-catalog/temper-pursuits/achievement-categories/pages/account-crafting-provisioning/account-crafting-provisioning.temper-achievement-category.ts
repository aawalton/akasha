import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCraftingProvisioning = {
  id: "01a06168-7247-700f-b79c-8aa8e6fb7a03",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-crafting-provisioning",
  title: "Provisioning",
  category: "account",
  displayOrder: 6,
  parent: "account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
