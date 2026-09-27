import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const treasure = {
  id: "01a0e10a-1c75-7ffe-aac7-005d66e89441",
  type: "page-type/temper-item-type",
  slug: "treasure",
  title: "Treasure",
  esoItemTypeNumber: 56,
} as const satisfies TemperItemType
