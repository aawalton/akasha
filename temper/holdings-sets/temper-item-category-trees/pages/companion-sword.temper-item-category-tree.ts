import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionSword = {
  id: "01a05fcf-f7d0-7ea9-abca-36cca1f1b182",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-sword",
  title: "Sword",
  parent: "companion-one-handed",
  displayOrder: 0,
  weaponTypes: [3],
} as const satisfies TemperItemCategoryTree
