import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const known = {
  id: "01a07209-6b51-796e-839e-eb3726bce05d",
  type: "page-type/temper-condition-field",
  slug: "known",
  title: "Known",
  key: "known",
  description:
    "Every character on the account must already know the item where the value is `known`, and at least one character must not know the item where the value is `not-known`.",
  createdAt: "2026-09-05T14:46:55.057Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
