import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnSoulGems = {
  id: "01a05fcf-f80e-7171-bea6-cf146ad16796",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-soul-gems",
  title: "Soul Gems",
  parent: "furn-undercroft",
  displayOrder: 5,
  furnitureSubcategoryIds: [198],
} as const satisfies TemperItemCategoryTree
