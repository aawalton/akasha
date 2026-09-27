import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"

export const trophyToy = {
  id: "01a0e11d-738a-7706-8896-4767c2b96e00",
  type: "page-type/temper-specialized-item-type",
  slug: "trophy-toy",
  title: "Toy",
  esoSpecializedItemTypeNumber: 111,
} as const satisfies TemperSpecializedItemType
