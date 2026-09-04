import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const lightArmor = {
  id: "01a05fcf-f826-74c2-9b85-d6d3b26d1006",
  pageTypeSlug: "temper-item-category-tree",
  slug: "light-armor",
  title: "Light Armor",
  parent: "armor",
  displayOrder: 1,
  armorTypes: [1],
} as const satisfies TemperItemCategoryTree
