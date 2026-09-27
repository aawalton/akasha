import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const weapon = {
  id: "01a0e10a-1c75-7f28-8fe6-e2c082780e6e",
  type: "page-type/temper-item-type",
  slug: "weapon",
  title: "Weapon",
  esoItemTypeNumber: 1,
} as const satisfies TemperItemType
