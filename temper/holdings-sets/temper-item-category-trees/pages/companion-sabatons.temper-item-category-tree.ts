import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionSabatons = {
  id: "01a05fcf-f7cf-732c-a359-861c739a0faf",
  type: "temper-item-category-tree",
  slug: "companion-sabatons",
  title: "Sabatons",
  parent: "companion-heavy",
  displayOrder: 6,
  equipTypes: [10],
} as const satisfies TemperItemCategoryTree
