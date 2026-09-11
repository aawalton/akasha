import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const companionCuirass = {
  id: "01a05fcf-f7c5-73bd-bc3e-3d710f1b5e54",
  type: "temper-item-category-tree",
  slug: "companion-cuirass",
  title: "Cuirass",
  parent: "companion-heavy",
  displayOrder: 1,
  equipTypes: [3],
} as const satisfies TemperItemCategoryTree
