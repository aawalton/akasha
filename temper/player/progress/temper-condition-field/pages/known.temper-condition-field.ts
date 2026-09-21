import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const known = {
  id: "01a07209-6b51-796e-839e-eb3726bce05d",
  type: "page-type/temper-condition-field",
  slug: "known",
  title: "Known",
  key: "known",
  description:
    "Every character on the account must already know the item where the value is `known`, and at least one character must not know the item where the value is `not-known`.",
} as const satisfies TemperConditionField
