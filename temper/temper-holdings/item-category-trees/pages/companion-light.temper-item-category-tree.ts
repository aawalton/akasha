import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionLight = {
  id: "01a05fcf-f7cc-7d50-bac5-fe0f88a94b0d",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-light",
  title: "Light Armor",
  parent: "companion-armor",
  displayOrder: 1,
  armorTypes: [1],
} as const satisfies TemperItemCategoryTree
