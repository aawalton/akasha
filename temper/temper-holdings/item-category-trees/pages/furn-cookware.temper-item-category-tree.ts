import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnCookware = {
  id: "01a05fcf-f7ed-7740-87db-5c18f0c6dcae",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-cookware",
  title: "Cookware",
  parent: "furn-hearth",
  displayOrder: 3,
  furnitureSubcategoryIds: [150],
} as const satisfies TemperItemCategoryTree
