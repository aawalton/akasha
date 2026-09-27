import type { TemperBuyAction } from "akasha/temper/player/progress/temper-buy-action/temper-buy-action.page-type.types.ts"

export const buy = {
  id: "01a0e26e-c071-7741-b427-660e171ffc6b",
  type: "page-type/temper-buy-action",
  slug: "buy",
  title: "Buy",
  key: "buy",
  displayOrder: 0,
} as const satisfies TemperBuyAction
