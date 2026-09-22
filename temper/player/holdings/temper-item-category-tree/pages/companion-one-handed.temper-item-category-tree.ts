import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const companionOneHanded = {
  id: "01a05fcf-f7ce-7c8a-bcc3-ce53ef06aa80",
  type: "page-type/temper-item-category-tree",
  slug: "companion-one-handed",
  title: "One-Handed",
  parent: "temper-item-category-tree/companion-weapons",
  displayOrder: 0,
  equipTypes: [5],
} as const satisfies TemperItemCategoryTree
