import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnBears = {
  id: "01a05fcf-f7e8-78be-a546-9bcf4753c54e",
  type: "temper-item-category-tree",
  slug: "furn-bears",
  title: "Bears",
  parent: "furn-mounts",
  displayOrder: 0,
  furnitureSubcategoryIds: [196],
} as const satisfies TemperItemCategoryTree
