import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnVampireUtility = {
  id: "01a05fcf-f818-7a6f-a974-caf0744032e6",
  type: "temper-item-category-tree",
  slug: "furn-vampire-utility",
  title: "Vampire Utility",
  parent: "furn-services",
  displayOrder: 15,
  furnitureSubcategoryIds: [189],
} as const satisfies TemperItemCategoryTree
