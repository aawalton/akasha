import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const bopTradeable = {
  id: "01a07209-6b4f-7d66-92c5-c4baca31c3f7",
  pageTypeSlug: "temper-condition-field",
  slug: "bop-tradeable",
  title: "Bind-on-Pickup Tradeable",
  key: "bopTradeable",
  description:
    "An item's bind-on-pickup tradeable flag must be true where the value is `bop-tradeable` and false where the value is `not-bop-tradeable`.",
} as const satisfies TemperConditionField
