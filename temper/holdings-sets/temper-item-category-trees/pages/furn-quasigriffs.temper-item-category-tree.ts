import type { TemperItemCategoryTree } from "akasha/temper/holdings-sets/temper-item-category-trees/temper-item-category-tree.page-type.types.ts"

export const furnQuasigriffs = {
  id: "01a05fcf-f80a-73f0-8660-32b693670d26",
  type: "temper-item-category-tree",
  slug: "furn-quasigriffs",
  title: "Quasigriffs",
  parent: "furn-mounts",
  displayOrder: 14,
  furnitureSubcategoryIds: [212],
} as const satisfies TemperItemCategoryTree
