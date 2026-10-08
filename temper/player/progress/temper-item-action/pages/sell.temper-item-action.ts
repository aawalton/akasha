import type { TemperItemAction } from "akasha/temper/player/progress/temper-item-action/temper-item-action.page-type.types.ts"

export const sell = {
  id: "01a071f0-4c86-7bcb-99d3-fe4cbcfa326b",
  type: "page-type/temper-item-action",
  slug: "sell",
  title: "Sell",
  description: "Sells the item to a merchant.",
  key: "sell",
  displayOrder: 13,
  createdAt: "2026-09-05T14:19:28.774Z",
  updatedAt: "2026-09-27T10:02:37.000Z",
} as const satisfies TemperItemAction
