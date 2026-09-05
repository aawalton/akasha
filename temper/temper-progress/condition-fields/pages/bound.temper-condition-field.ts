import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const bound = {
  id: "01a07209-6b4f-744d-b9df-baed60794cad",
  pageTypeSlug: "temper-condition-field",
  slug: "bound",
  title: "Bound",
  key: "bound",
  description:
    "An item's bound flag must be true where the value is `bound` and false where the value is `not-bound`.",
} as const satisfies TemperConditionField
