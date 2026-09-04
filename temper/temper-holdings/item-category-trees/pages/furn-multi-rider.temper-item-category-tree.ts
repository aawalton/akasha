import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnMultiRider = {
  id: "01a05fcf-f803-73ae-8e6c-95b5724615ff",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-multi-rider",
  title: "Multi-Rider",
  parent: "furn-mounts",
  displayOrder: 11,
  furnitureSubcategoryIds: [190],
} as const satisfies TemperItemCategoryTree
