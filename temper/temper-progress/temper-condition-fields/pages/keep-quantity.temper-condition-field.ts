import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const keepQuantity = {
  id: "01a07209-6b51-795a-b1ac-3a82ccdac7c2",
  pageTypeSlug: "temper-condition-field",
  slug: "keep-quantity",
  title: "Keep Quantity",
  key: "keepQuantity",
  description:
    "A rule names how many of the matching item to hold back from an outbound action such as sell or deconstruct, and no condition checker in this checkout reads the number.",
} as const satisfies TemperConditionField
