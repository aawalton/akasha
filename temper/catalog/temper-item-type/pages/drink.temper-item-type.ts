import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const drink = {
  id: "01a0e10a-1c75-7779-a7bc-d66fab72fafb",
  type: "page-type/temper-item-type",
  slug: "drink",
  title: "Drink",
  esoItemTypeNumber: 12,
} as const satisfies TemperItemType
