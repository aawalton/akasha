import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const marketValueOp = {
  id: "01a07209-6b51-7df7-a7e0-14b4a13b61a3",
  type: "page-type/temper-condition-field",
  slug: "market-value-op",
  title: "Market Value Comparison",
  key: "marketValueOp",
  description:
    "The operator named here replaces the default `<=` when an item's estimated market value is compared against `marketValue`.",
  createdAt: "2026-09-05T14:46:55.057Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
