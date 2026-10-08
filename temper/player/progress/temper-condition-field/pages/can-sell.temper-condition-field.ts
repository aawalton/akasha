import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const canSell = {
  id: "01a07209-6b50-705b-bf33-d3a3361db568",
  type: "page-type/temper-condition-field",
  slug: "can-sell",
  title: "Can Sell to Merchant",
  key: "canSell",
  description:
    "An item's merchant sell price must be above zero, so an item worth nothing to a merchant fails, and the test is offered only for sell and fence-sell rules.",
  createdAt: "2026-09-05T14:46:55.056Z",
  updatedAt: "2026-09-27T10:00:08.000Z",
} as const satisfies TemperConditionField
