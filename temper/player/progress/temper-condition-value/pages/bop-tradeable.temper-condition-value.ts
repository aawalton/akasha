import type { TemperConditionValue } from "akasha/temper/player/progress/temper-condition-value/temper-condition-value.page-type.types.ts"

export const bopTradeable = {
  id: "01a0e271-5ad0-762b-acb2-1f2a92852b52",
  type: "page-type/temper-condition-value",
  slug: "bop-tradeable",
  title: "Is Bind on Pickup Tradeable",
  key: "bop-tradeable",
  conditionField: "temper-condition-field/bop-tradeable",
  displayOrder: 0,
  createdAt: "2026-09-27T10:37:54.768Z",
  updatedAt: "2026-09-27T10:37:57.000Z",
} as const satisfies TemperConditionValue
