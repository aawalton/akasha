import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnDeer = {
  id: "01a05fcf-f7f1-7c4c-815f-e79af21007f3",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-deer",
  title: "Deer",
  parent: "furn-mounts",
  displayOrder: 4,
  furnitureSubcategoryIds: [192],
} as const satisfies TemperItemCategoryTree
