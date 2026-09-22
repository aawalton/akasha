import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionGreatsword = {
  id: "01a05fcf-f7c8-7ddf-b5e4-6891d30e7f49",
  type: "page-type/temper-item-category-tree",
  slug: "companion-greatsword",
  title: "Greatsword",
  parent: "temper-item-category-tree/companion-two-handed",
  displayOrder: 0,
  weaponTypes: [4],
} as const satisfies TemperItemCategoryTree
