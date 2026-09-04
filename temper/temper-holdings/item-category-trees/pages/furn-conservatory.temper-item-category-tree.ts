import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnConservatory = {
  id: "01a05fcf-f7ed-7634-9dae-a200cc3c9652",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-conservatory",
  title: "Conservatory",
  parent: "furnishings",
  displayOrder: 10,
  furnitureCategoryIds: [11],
} as const satisfies TemperItemCategoryTree
