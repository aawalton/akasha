import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionAxe = {
  id: "01a05fcf-f7c3-7465-8d1c-5a26ec243428",
  type: "page-type/temper-item-category-tree",
  slug: "companion-axe",
  title: "Axe",
  parent: "temper-item-category-tree/companion-one-handed",
  displayOrder: 1,
  weaponTypes: [1],
} as const satisfies TemperItemCategoryTree
