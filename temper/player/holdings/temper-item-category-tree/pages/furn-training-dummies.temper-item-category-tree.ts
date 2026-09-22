import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const furnTrainingDummies = {
  id: "01a05fcf-f815-729e-a615-498b60c633ac",
  type: "page-type/temper-item-category-tree",
  slug: "furn-training-dummies",
  title: "Training Dummies",
  parent: "temper-item-category-tree/furn-services",
  displayOrder: 13,
  furnitureSubcategoryIds: [97],
} as const satisfies TemperItemCategoryTree
