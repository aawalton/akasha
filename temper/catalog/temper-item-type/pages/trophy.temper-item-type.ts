import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const trophy = {
  id: "01a0e11b-967b-71bf-b205-7a45443c00fd",
  type: "page-type/temper-item-type",
  slug: "trophy",
  title: "Trophy",
  esoItemTypeNumber: 5,
} as const satisfies TemperItemType
