import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const shield = {
  id: "01a05fcf-f83b-7096-bf42-2c6f6bbb40d8",
  type: "temper-item-category-tree",
  slug: "shield",
  title: "Shield",
  parent: "armor",
  displayOrder: 0,
  weaponTypes: [14],
} as const satisfies TemperItemCategoryTree
