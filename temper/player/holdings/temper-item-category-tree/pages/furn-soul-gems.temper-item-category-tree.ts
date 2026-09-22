import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSoulGems = {
  id: "01a05fcf-f80e-7171-bea6-cf146ad16796",
  type: "page-type/temper-item-category-tree",
  slug: "furn-soul-gems",
  title: "Soul Gems",
  parent: "temper-item-category-tree/furn-undercroft",
  displayOrder: 5,
  furnitureSubcategoryIds: [198],
} as const satisfies TemperItemCategoryTree
