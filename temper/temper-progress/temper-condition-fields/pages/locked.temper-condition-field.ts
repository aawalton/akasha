import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const locked = {
  id: "01a07209-6b51-7d08-96a3-0a7e0f11b81a",
  pageTypeSlug: "temper-condition-field",
  slug: "locked",
  title: "Locked",
  key: "locked",
  description:
    "An item's locked flag must be true where the value is `locked` and false where the value is `not-locked`.",
} as const satisfies TemperConditionField
