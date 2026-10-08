import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const bopTradeable = {
  id: "01a07209-6b4f-7d66-92c5-c4baca31c3f7",
  type: "page-type/temper-condition-field",
  slug: "bop-tradeable",
  title: "Bind on Pickup Tradeable",
  key: "bopTradeable",
  description:
    "An item's bind-on-pickup tradeable flag must be true where the value is `bop-tradeable` and false where the value is `not-bop-tradeable`.",
  createdAt: "2026-09-05T14:46:55.055Z",
  updatedAt: "2026-09-27T10:00:08.000Z",
} as const satisfies TemperConditionField
