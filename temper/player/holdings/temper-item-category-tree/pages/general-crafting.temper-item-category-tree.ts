import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const generalCrafting = {
  id: "01a05fcf-f81d-7f83-89ae-9aeaf63f8386",
  type: "page-type/temper-item-category-tree",
  slug: "general-crafting",
  title: "General Crafting",
  parent: "temper-item-category-tree/crafting",
  displayOrder: 10,
  filterTypes: [4],
  createdAt: "2026-09-02T01:51:00.125Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
