import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnPipesMechanisms = {
  id: "01a05fcf-f807-758b-b38e-9c82f4112d67",
  type: "temper-item-category-tree",
  slug: "furn-pipes-mechanisms",
  title: "Pipes and Mechanisms",
  parent: "furn-workshop",
  displayOrder: 3,
  furnitureSubcategoryIds: [158],
} as const satisfies TemperItemCategoryTree
