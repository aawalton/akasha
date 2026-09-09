import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const known = {
  id: "01a07209-6b51-796e-839e-eb3726bce05d",
  pageTypeSlug: "temper-condition-field",
  slug: "known",
  title: "Known",
  key: "known",
  description:
    "Every character on the account must already know the item where the value is `known`, and at least one character must not know the item where the value is `not-known`.",
} as const satisfies TemperConditionField
