import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const lightBreeches = {
  id: "01a05fcf-f826-7184-b53d-bb130bc1c7ad",
  type: "page-type/temper-item-category-tree",
  slug: "light-breeches",
  title: "Breeches",
  parent: "temper-item-category-tree/light-armor",
  displayOrder: 5,
  equipTypes: [9],
} as const satisfies TemperItemCategoryTree
