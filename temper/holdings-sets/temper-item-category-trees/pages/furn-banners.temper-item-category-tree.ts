import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnBanners = {
  id: "01a05fcf-f7e6-7feb-898a-5ef67556fdb1",
  type: "temper-item-category-tree",
  slug: "furn-banners",
  title: "Banners",
  parent: "furn-parlor",
  displayOrder: 0,
  furnitureSubcategoryIds: [57],
} as const satisfies TemperItemCategoryTree
