import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnBigCats = {
  id: "01a05fcf-f7e9-7e92-990a-a1536f34f62f",
  type: "temper-item-category-tree",
  slug: "furn-big-cats",
  title: "Big Cats",
  parent: "furn-mounts",
  displayOrder: 1,
  furnitureSubcategoryIds: [29],
} as const satisfies TemperItemCategoryTree
