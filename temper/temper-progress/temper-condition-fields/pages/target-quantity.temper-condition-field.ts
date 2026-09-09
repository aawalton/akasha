import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const targetQuantity = {
  id: "01a07209-6b53-7bed-b627-6f26254a2793",
  pageTypeSlug: "temper-condition-field",
  slug: "target-quantity",
  title: "Target Quantity",
  key: "targetQuantity",
  description:
    "The bank stock summed across the item's whole stock group must fall below the number stated, so an item already banked to target fails.",
} as const satisfies TemperConditionField
