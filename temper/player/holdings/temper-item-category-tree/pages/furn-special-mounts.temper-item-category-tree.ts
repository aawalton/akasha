import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnSpecialMounts = {
  id: "01a05fcf-f80e-7127-a657-d41705fc91c1",
  type: "page-type/temper-item-category-tree",
  slug: "furn-special-mounts",
  title: "Special",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 17,
  furnitureSubcategoryIds: [205],
} as const satisfies TemperItemCategoryTree
