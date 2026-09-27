import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const trash = {
  id: "01a0e10a-1c75-7726-8dbb-7be8daef3e65",
  type: "page-type/temper-item-type",
  slug: "trash",
  title: "Trash",
  esoItemTypeNumber: 48,
} as const satisfies TemperItemType
