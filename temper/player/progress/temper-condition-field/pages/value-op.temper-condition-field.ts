import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const valueOp = {
  id: "01a07209-6b53-7d35-9a37-3f29156126d1",
  type: "page-type/temper-condition-field",
  slug: "value-op",
  title: "Value Comparison",
  key: "valueOp",
  description:
    "The operator named here replaces the default `<=` when an item's greatest value figure is compared against `value`.",
  createdAt: "2026-09-05T14:46:55.059Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
