import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const mediumBoots = {
  id: "01a05fcf-f82c-7b52-8f54-74b1e3286629",
  type: "page-type/temper-item-category-tree",
  slug: "medium-boots",
  title: "Boots",
  parent: "temper-item-category-tree/medium-armor",
  displayOrder: 6,
  equipTypes: [10],
  createdAt: "2026-09-02T01:51:00.140Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
