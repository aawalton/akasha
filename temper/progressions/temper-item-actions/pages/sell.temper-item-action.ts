import type { TemperItemAction } from "akasha/temper/progressions/temper-item-actions/temper-item-action.page-type.types.ts"

export const sell = {
  id: "01a071f0-4c86-7bcb-99d3-fe4cbcfa326b",
  type: "temper-item-action",
  slug: "sell",
  title: "Sell",
  description: "Sells the item to a merchant.",
} as const satisfies TemperItemAction
