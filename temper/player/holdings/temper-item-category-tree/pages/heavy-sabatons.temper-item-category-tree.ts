import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const heavySabatons = {
  id: "01a05fcf-f821-7e62-af98-21f8434945ac",
  type: "page-type/temper-item-category-tree",
  slug: "heavy-sabatons",
  title: "Sabatons",
  parent: "temper-item-category-tree/heavy-armor",
  displayOrder: 6,
  equipTypes: [10],
  createdAt: "2026-09-02T01:51:00.129Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
