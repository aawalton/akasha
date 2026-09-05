import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const canSell = {
  id: "01a07209-6b50-705b-bf33-d3a3361db568",
  pageTypeSlug: "temper-condition-field",
  slug: "can-sell",
  title: "Can Sell",
  key: "canSell",
  description:
    "An item's merchant sell price must be above zero, so an item worth nothing to a merchant fails, and the test is offered only for sell and fence-sell rules.",
} as const satisfies TemperConditionField
