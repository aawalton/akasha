import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const fish = {
  id: "01a0e11b-967a-71e4-8853-c33a1f3d402a",
  type: "page-type/temper-item-type",
  slug: "fish",
  title: "Fish",
  esoItemTypeNumber: 54,
} as const satisfies TemperItemType
