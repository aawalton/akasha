import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const allianceWar = {
  id: "01a05fcf-f7bb-7c0f-80c6-5d3ef1d912ad",
  type: "page-type/temper-item-category-tree",
  slug: "alliance-war",
  title: "Alliance War",
  parent: "temper-item-category-tree/miscellaneous",
  displayOrder: 0,
} as const satisfies TemperItemCategoryTree
