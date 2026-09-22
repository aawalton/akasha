import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMultiRider = {
  id: "01a05fcf-f803-73ae-8e6c-95b5724615ff",
  type: "page-type/temper-item-category-tree",
  slug: "furn-multi-rider",
  title: "Multi-Rider",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 11,
  furnitureSubcategoryIds: [190],
} as const satisfies TemperItemCategoryTree
