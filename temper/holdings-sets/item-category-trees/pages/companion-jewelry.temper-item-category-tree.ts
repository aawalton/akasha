import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionJewelry = {
  id: "01a05fcf-f7cb-79bd-bfd5-2d64810cf866",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-jewelry",
  title: "Jewelry",
  parent: "companion",
  displayOrder: 2,
  traitTypeRange: [52, 60],
} as const satisfies TemperItemCategoryTree
