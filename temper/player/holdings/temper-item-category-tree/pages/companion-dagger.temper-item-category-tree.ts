import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionDagger = {
  id: "01a05fcf-f7c6-744d-aaa9-3e9d1b16e72c",
  type: "page-type/temper-item-category-tree",
  slug: "companion-dagger",
  title: "Dagger",
  parent: "temper-item-category-tree/companion-one-handed",
  displayOrder: 3,
  weaponTypes: [11],
} as const satisfies TemperItemCategoryTree
