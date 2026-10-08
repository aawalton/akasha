import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const maxValue = {
  id: "01a07209-6b52-733e-bd26-b8536d049bb5",
  type: "page-type/temper-condition-field",
  slug: "max-value",
  title: "Max Value",
  key: "maxValue",
  description:
    "An item's estimated market value must be no greater than the number stated, and this field is read only where the rule sets no `marketValue`.",
  createdAt: "2026-09-05T14:46:55.058Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
