import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnProduce = {
  id: "01a05fcf-f809-77e2-bd37-1fc2bafb5672",
  type: "page-type/temper-item-category-tree",
  slug: "furn-produce",
  title: "Produce",
  parent: "temper-item-category-tree/furn-hearth",
  displayOrder: 11,
  furnitureSubcategoryIds: [153],
} as const satisfies TemperItemCategoryTree
