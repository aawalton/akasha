import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnProduce = {
  id: "01a05fcf-f809-77e2-bd37-1fc2bafb5672",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-produce",
  title: "Produce",
  parent: "furn-hearth",
  displayOrder: 11,
  furnitureSubcategoryIds: [153],
} as const satisfies TemperItemCategoryTree
