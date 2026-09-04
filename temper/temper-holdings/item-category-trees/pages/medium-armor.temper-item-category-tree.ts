import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const mediumArmor = {
  id: "01a05fcf-f82b-7fae-a5cc-90ddd9daad34",
  pageTypeSlug: "temper-item-category-tree",
  slug: "medium-armor",
  title: "Medium Armor",
  parent: "armor",
  displayOrder: 2,
  armorTypes: [2],
} as const satisfies TemperItemCategoryTree
