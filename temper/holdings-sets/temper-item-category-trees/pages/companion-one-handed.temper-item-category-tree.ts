import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionOneHanded = {
  id: "01a05fcf-f7ce-7c8a-bcc3-ce53ef06aa80",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-one-handed",
  title: "One-Handed",
  parent: "companion-weapons",
  displayOrder: 0,
  equipTypes: [5],
} as const satisfies TemperItemCategoryTree
