import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnRams = {
  id: "01a05fcf-f80a-7c39-82ae-a942e00c247a",
  type: "page-type/temper-item-category-tree",
  slug: "furn-rams",
  title: "Rams",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 15,
  furnitureSubcategoryIds: [211],
} as const satisfies TemperItemCategoryTree
