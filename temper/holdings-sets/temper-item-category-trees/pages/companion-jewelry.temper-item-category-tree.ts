import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionJewelry = {
  id: "01a05fcf-f7cb-79bd-bfd5-2d64810cf866",
  type: "temper-item-category-tree",
  slug: "companion-jewelry",
  title: "Jewelry",
  parent: "companion",
  displayOrder: 2,
  traitTypeRange: [52, 60],
} as const satisfies TemperItemCategoryTree
