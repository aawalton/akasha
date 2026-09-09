import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnRams = {
  id: "01a05fcf-f80a-7c39-82ae-a942e00c247a",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-rams",
  title: "Rams",
  parent: "furn-mounts",
  displayOrder: 15,
  furnitureSubcategoryIds: [211],
} as const satisfies TemperItemCategoryTree
