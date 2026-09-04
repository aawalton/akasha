import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const heavyPauldrons = {
  id: "01a05fcf-f821-73a9-948e-e10d92de940d",
  pageTypeSlug: "temper-item-category-tree",
  slug: "heavy-pauldrons",
  title: "Pauldrons",
  parent: "heavy-armor",
  displayOrder: 2,
  equipTypes: [4],
} as const satisfies TemperItemCategoryTree
