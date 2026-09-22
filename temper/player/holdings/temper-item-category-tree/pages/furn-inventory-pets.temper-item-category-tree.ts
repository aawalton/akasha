import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnInventoryPets = {
  id: "01a05fcf-f7fd-7983-865b-c301bff29eb1",
  type: "page-type/temper-item-category-tree",
  slug: "furn-inventory-pets",
  title: "Inventory",
  parent: "temper-item-category-tree/furn-pets",
  displayOrder: 5,
  furnitureSubcategoryIds: [187],
} as const satisfies TemperItemCategoryTree
