import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const potionBase = {
  id: "01a0e11b-967a-748e-a214-7de2fcdf10e0",
  type: "page-type/temper-item-type",
  slug: "potion-base",
  title: "Potion Solvent",
  esoItemTypeNumber: 33,
} as const satisfies TemperItemType
