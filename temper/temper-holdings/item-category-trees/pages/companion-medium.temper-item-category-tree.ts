import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionMedium = {
  id: "01a05fcf-f7cd-70db-a3e4-284db40eda7c",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-medium",
  title: "Medium Armor",
  parent: "companion-armor",
  displayOrder: 2,
  armorTypes: [2],
} as const satisfies TemperItemCategoryTree
