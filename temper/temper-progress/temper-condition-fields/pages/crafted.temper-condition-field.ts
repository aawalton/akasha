import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const crafted = {
  id: "01a07209-6b50-780b-b032-058e683cef20",
  pageTypeSlug: "temper-condition-field",
  slug: "crafted",
  title: "Crafted",
  key: "crafted",
  description:
    "An item's crafted flag must be true where the value is `crafted` and false where the value is `not-crafted`.",
} as const satisfies TemperConditionField
