import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const food = {
  id: "01a0e10a-1c75-7501-a1a4-c623ae75060e",
  type: "page-type/temper-item-type",
  slug: "food",
  title: "Food",
  esoItemTypeNumber: 4,
} as const satisfies TemperItemType
