import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const stackFullness = {
  id: "01a07209-6b53-718d-9f85-b9e62d85b39d",
  pageTypeSlug: "temper-condition-field",
  slug: "stack-fullness",
  title: "Stack Fullness",
  key: "stackFullness",
  description:
    "An item's stack count must reach the item's maximum stack size where the value is `full`, and fall below that size where the value is `partial`.",
} as const satisfies TemperConditionField
