import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const poisons = {
  id: "01a05fcf-f830-714c-b4a6-b3c97658d357",
  type: "page-type/temper-item-category-tree",
  slug: "poisons",
  title: "Poisons",
  parent: "temper-item-category-tree/consumables",
  displayOrder: 3,
  itemTypes: [30],
  createdAt: "2026-09-02T01:51:00.144Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
