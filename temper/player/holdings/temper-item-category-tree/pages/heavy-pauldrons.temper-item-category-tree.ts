import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const heavyPauldrons = {
  id: "01a05fcf-f821-73a9-948e-e10d92de940d",
  type: "page-type/temper-item-category-tree",
  slug: "heavy-pauldrons",
  title: "Pauldrons",
  parent: "temper-item-category-tree/heavy-armor",
  displayOrder: 2,
  equipTypes: [4],
} as const satisfies TemperItemCategoryTree
