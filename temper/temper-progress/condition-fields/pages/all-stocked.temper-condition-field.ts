import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const allStocked = {
  id: "01a07209-6b4e-7e7e-ab26-44d84361ab3e",
  pageTypeSlug: "temper-condition-field",
  slug: "all-stocked",
  title: "All Stocked",
  key: "allStocked",
  description:
    "Every character wanting the item's stock group must already hold at least the stock threshold where the value is `all-stocked`, and one character must fall short where the value is `not-all-stocked`.",
} as const satisfies TemperConditionField
