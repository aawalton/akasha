import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnVehicles = {
  id: "01a05fcf-f819-7266-8a94-c9fabd400c32",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-vehicles",
  title: "Vehicles",
  parent: "furn-courtyard",
  displayOrder: 3,
  furnitureSubcategoryIds: [70],
} as const satisfies TemperItemCategoryTree
