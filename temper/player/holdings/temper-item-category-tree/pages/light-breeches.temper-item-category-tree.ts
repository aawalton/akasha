import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lightBreeches = {
  id: "01a05fcf-f826-7184-b53d-bb130bc1c7ad",
  type: "page-type/temper-item-category-tree",
  slug: "light-breeches",
  title: "Breeches",
  parent: "temper-item-category-tree/light-armor",
  displayOrder: 5,
  equipTypes: [9],
  createdAt: "2026-09-02T01:51:00.134Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
