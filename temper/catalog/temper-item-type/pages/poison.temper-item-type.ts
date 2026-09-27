import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const poison = {
  id: "01a0e10a-1c75-74a0-8aa6-ccb91a916e46",
  type: "page-type/temper-item-type",
  slug: "poison",
  title: "Poison",
  esoItemTypeNumber: 30,
} as const satisfies TemperItemType
