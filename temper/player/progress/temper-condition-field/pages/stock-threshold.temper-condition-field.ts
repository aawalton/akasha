import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const stockThreshold = {
  id: "01a07209-6b53-7b82-a04a-06279f6e58f0",
  type: "page-type/temper-condition-field",
  slug: "stock-threshold",
  title: "Stock Threshold",
  key: "stockThreshold",
  description:
    "The per-character unit count `allStocked` compares stock against is named here, defaulting to 200 where a rule sets none.",
  createdAt: "2026-09-05T14:46:55.059Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
