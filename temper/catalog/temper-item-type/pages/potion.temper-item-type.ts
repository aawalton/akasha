import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const potion = {
  id: "01a0e10a-1c75-7b82-922b-a70e5b9b2906",
  type: "page-type/temper-item-type",
  slug: "potion",
  title: "Potion",
  esoItemTypeNumber: 7,
} as const satisfies TemperItemType
