import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionPauldrons = {
  id: "01a05fcf-f7ce-7b3d-bf0d-ec6167434a48",
  type: "temper-item-category-tree",
  slug: "companion-pauldrons",
  title: "Pauldrons",
  parent: "companion-heavy",
  displayOrder: 2,
  equipTypes: [4],
} as const satisfies TemperItemCategoryTree
