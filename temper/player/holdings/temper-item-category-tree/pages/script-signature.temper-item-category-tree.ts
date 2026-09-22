import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const scriptSignature = {
  id: "01a05fcf-f83a-74c5-9622-96ed9eb6f078",
  type: "page-type/temper-item-category-tree",
  slug: "script-signature",
  title: "Signature",
  parent: "temper-item-category-tree/scripts",
  displayOrder: 1,
  specializedItemTypes: [3251],
} as const satisfies TemperItemCategoryTree
