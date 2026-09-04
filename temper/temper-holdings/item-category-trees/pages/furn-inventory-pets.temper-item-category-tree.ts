import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnInventoryPets = {
  id: "01a05fcf-f7fd-7983-865b-c301bff29eb1",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-inventory-pets",
  title: "Inventory",
  parent: "furn-pets",
  displayOrder: 5,
  furnitureSubcategoryIds: [187],
} as const satisfies TemperItemCategoryTree
