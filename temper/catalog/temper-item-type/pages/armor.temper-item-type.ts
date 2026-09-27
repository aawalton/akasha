import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const armor = {
  id: "01a0e10a-1c74-7689-942c-41b55c607ff6",
  type: "page-type/temper-item-type",
  slug: "armor",
  title: "Armor",
  esoItemTypeNumber: 2,
} as const satisfies TemperItemType
