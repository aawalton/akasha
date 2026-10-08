import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const heavyPauldrons = {
  id: "01a05fcf-f821-73a9-948e-e10d92de940d",
  type: "page-type/temper-item-category-tree",
  slug: "heavy-pauldrons",
  title: "Pauldrons",
  parent: "temper-item-category-tree/heavy-armor",
  displayOrder: 2,
  equipTypes: [4],
  createdAt: "2026-09-02T01:51:00.129Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
