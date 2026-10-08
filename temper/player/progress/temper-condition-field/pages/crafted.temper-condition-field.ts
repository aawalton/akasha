import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const crafted = {
  id: "01a07209-6b50-780b-b032-058e683cef20",
  type: "page-type/temper-condition-field",
  slug: "crafted",
  title: "Crafted",
  key: "crafted",
  description:
    "An item's crafted flag must be true where the value is `crafted` and false where the value is `not-crafted`.",
  createdAt: "2026-09-05T14:46:55.056Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
