import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnVehicles = {
  id: "01a05fcf-f819-7266-8a94-c9fabd400c32",
  type: "page-type/temper-item-category-tree",
  slug: "furn-vehicles",
  title: "Vehicles",
  parent: "temper-item-category-tree/furn-courtyard",
  displayOrder: 3,
  furnitureSubcategoryIds: [70],
  createdAt: "2026-09-02T01:51:00.121Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
