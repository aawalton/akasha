import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionRobe = {
  id: "01a05fcf-f7cf-7d02-afe1-7f90381a8f4d",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-robe",
  title: "Robe / Jerkin",
  parent: "companion-light",
  displayOrder: 1,
  equipTypes: [3],
} as const satisfies TemperItemCategoryTree
