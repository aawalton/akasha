import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const soulGem = {
  id: "01a0e10a-1c75-7cf1-bd77-dc5a75555309",
  type: "page-type/temper-item-type",
  slug: "soul-gem",
  title: "Soul Gem",
  esoItemTypeNumber: 19,
} as const satisfies TemperItemType
