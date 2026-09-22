import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnWelwas = {
  id: "01a05fcf-f81b-723e-9f34-5cd52a02a314",
  type: "page-type/temper-item-category-tree",
  slug: "furn-welwas",
  title: "Welwas",
  parent: "temper-item-category-tree/furn-mounts",
  displayOrder: 22,
  furnitureSubcategoryIds: [213],
} as const satisfies TemperItemCategoryTree
