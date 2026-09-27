import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const crownItem = {
  id: "01a0e11b-967a-7afd-80e5-578f2d66e8ed",
  type: "page-type/temper-item-type",
  slug: "crown-item",
  title: "Crown Item",
  esoItemTypeNumber: 57,
} as const satisfies TemperItemType
