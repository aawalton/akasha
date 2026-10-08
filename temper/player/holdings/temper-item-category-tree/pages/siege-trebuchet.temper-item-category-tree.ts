import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const siegeTrebuchet = {
  id: "01a05fcf-f83e-7a2e-81c1-7f6c6c2fcfb8",
  type: "page-type/temper-item-category-tree",
  slug: "siege-trebuchet",
  title: "Trebuchet",
  parent: "temper-item-category-tree/siege-equipment",
  displayOrder: 0,
  specializedItemTypes: [400],
  createdAt: "2026-09-02T01:51:00.158Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
