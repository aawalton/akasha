import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const transmuted = {
  id: "01a07209-6b53-75c2-b772-5772cebcdd26",
  pageTypeSlug: "temper-condition-field",
  slug: "transmuted",
  title: "Transmuted",
  key: "transmuted",
  description:
    "An item's transmuted flag must be true where the value is `transmuted` and false where the value is `not-transmuted`, and the test suits equipment alone.",
} as const satisfies TemperConditionField
