import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const marketValue = {
  id: "01a07209-6b51-7fca-8a11-730a4bc2f40d",
  type: "page-type/temper-condition-field",
  slug: "market-value",
  title: "Market Value",
  key: "marketValue",
  description:
    "An item's estimated market value is compared against the number or named constant stated, under `<=` by default, and this field overrides `maxValue` and `minValue` entirely.",
  createdAt: "2026-09-05T14:46:55.057Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
