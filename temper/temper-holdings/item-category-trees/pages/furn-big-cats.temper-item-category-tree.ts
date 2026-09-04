import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnBigCats = {
  id: "01a05fcf-f7e9-7e92-990a-a1536f34f62f",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-big-cats",
  title: "Big Cats",
  parent: "furn-mounts",
  displayOrder: 1,
  furnitureSubcategoryIds: [29],
} as const satisfies TemperItemCategoryTree
