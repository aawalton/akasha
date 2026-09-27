import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const notBopTradeable = {
  id: "01a0e271-5ad0-7724-b5c2-80f72a021c3b",
  type: "page-type/temper-condition-value",
  slug: "not-bop-tradeable",
  title: "Is Not Bind on Pickup Tradeable",
  key: "not-bop-tradeable",
  conditionField: "temper-condition-field/bop-tradeable",
  displayOrder: 1,
} as const satisfies TemperConditionValue
