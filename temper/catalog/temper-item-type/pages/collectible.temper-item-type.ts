import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const collectible = {
  id: "01a0e11b-967a-780e-8516-a5234df3b020",
  type: "page-type/temper-item-type",
  slug: "collectible",
  title: "Collectible",
  esoItemTypeNumber: 34,
} as const satisfies TemperItemType
