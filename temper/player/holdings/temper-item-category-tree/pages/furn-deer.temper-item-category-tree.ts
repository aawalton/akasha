import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnDeer = {
  id: "01a05fcf-f7f1-7c4c-815f-e79af21007f3",
  type: "page-type/temper-item-category-tree",
  slug: "furn-deer",
  title: "Deer",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 4,
  furnitureSubcategoryIds: [192],
} as const satisfies TemperItemCategoryTree
