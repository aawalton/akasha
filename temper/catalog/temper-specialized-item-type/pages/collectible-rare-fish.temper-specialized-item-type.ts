import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const collectibleRareFish = {
  id: "01a0e11d-7389-78fe-b59d-1d88092dc1f4",
  type: "page-type/temper-specialized-item-type",
  slug: "collectible-rare-fish",
  title: "Rare Fish",
  esoSpecializedItemTypeNumber: 80,
} as const satisfies TemperSpecializedItemType
