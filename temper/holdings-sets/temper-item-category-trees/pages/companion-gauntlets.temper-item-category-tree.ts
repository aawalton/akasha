import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionGauntlets = {
  id: "01a05fcf-f7c7-7629-9a01-a5393ea89663",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-gauntlets",
  title: "Gauntlets",
  parent: "companion-heavy",
  displayOrder: 3,
  equipTypes: [13],
} as const satisfies TemperItemCategoryTree
