import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const soulGems = {
  id: "01a05fcf-f83f-7cf4-80ab-2fbe119c6723",
  pageTypeSlug: "temper-item-category-tree",
  slug: "soul-gems",
  title: "Soul Gems",
  parent: "consumables",
  displayOrder: 5,
  itemTypes: [19],
} as const satisfies TemperItemCategoryTree
