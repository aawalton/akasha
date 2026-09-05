import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const maxLevel = {
  id: "01a07209-6b52-747e-9f9e-06ca8c60eb3a",
  pageTypeSlug: "temper-condition-field",
  slug: "max-level",
  title: "Max Level",
  key: "maxLevel",
  description:
    "An item's required level, raised to 50 plus a tenth of the item's champion points where those are above zero, is compared against the number stated, under `<=` by default.",
} as const satisfies TemperConditionField
