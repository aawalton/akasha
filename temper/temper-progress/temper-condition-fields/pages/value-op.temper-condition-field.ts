import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const valueOp = {
  id: "01a07209-6b53-7d35-9a37-3f29156126d1",
  pageTypeSlug: "temper-condition-field",
  slug: "value-op",
  title: "Value Comparison",
  key: "valueOp",
  description:
    "The operator named here replaces the default `<=` when an item's greatest value figure is compared against `value`.",
} as const satisfies TemperConditionField
