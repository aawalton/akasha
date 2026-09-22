import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnPipesMechanisms = {
  id: "01a05fcf-f807-758b-b38e-9c82f4112d67",
  type: "page-type/temper-item-category-tree",
  slug: "furn-pipes-mechanisms",
  title: "Pipes and Mechanisms",
  parent: "temper-item-category-tree/furn-workshop",
  displayOrder: 3,
  furnitureSubcategoryIds: [158],
} as const satisfies TemperItemCategoryTree
