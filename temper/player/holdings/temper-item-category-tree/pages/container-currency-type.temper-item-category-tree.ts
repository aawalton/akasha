import type { TemperItemCategoryTree } from "akasha/temper/player/holdings/temper-item-category-tree/temper-item-category-tree.page-type.types.ts"

export const containerCurrencyType = {
  id: "01a05fcf-f7d2-783b-9ff4-ee42c4901641",
  type: "page-type/temper-item-category-tree",
  slug: "container-currency-type",
  title: "Currency Container",
  parent: "temper-item-category-tree/containers",
  displayOrder: 6,
  itemTypes: [70],
  createdAt: "2026-09-02T01:51:00.050Z",
  updatedAt: "2026-09-22T20:49:49.000Z",
} as const satisfies TemperItemCategoryTree
