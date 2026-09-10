import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.types.ts"

export const furnBears = {
  id: "01a05fcf-f7e8-78be-a546-9bcf4753c54e",
  pageTypeSlug: "temper-item-category-tree",
  type: "temper-item-category-tree",
  slug: "furn-bears",
  title: "Bears",
  parent: "furn-mounts",
  displayOrder: 0,
  furnitureSubcategoryIds: [196],
} as const satisfies TemperItemCategoryTree
