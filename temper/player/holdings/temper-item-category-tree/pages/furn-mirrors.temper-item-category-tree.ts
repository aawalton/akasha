import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnMirrors = {
  id: "01a05fcf-f802-7ebf-8098-36021adb60bc",
  type: "page-type/temper-item-category-tree",
  slug: "furn-mirrors",
  title: "Mirrors",
  parent: "temper-item-category-tree/furn-suite",
  displayOrder: 4,
  furnitureSubcategoryIds: [49],
  createdAt: "2026-09-02T01:51:00.098Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
