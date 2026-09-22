import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnBears = {
  id: "01a05fcf-f7e8-78be-a546-9bcf4753c54e",
  type: "page-type/temper-item-category-tree",
  slug: "furn-bears",
  title: "Bears",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 0,
  furnitureSubcategoryIds: [196],
} as const satisfies TemperItemCategoryTree
