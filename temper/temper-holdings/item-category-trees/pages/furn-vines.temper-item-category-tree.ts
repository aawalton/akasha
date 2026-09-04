import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnVines = {
  id: "01a05fcf-f819-76c6-bde3-bf4a2cfcc15d",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-vines",
  title: "Vines",
  parent: "furn-conservatory",
  displayOrder: 15,
  furnitureSubcategoryIds: [111],
} as const satisfies TemperItemCategoryTree
