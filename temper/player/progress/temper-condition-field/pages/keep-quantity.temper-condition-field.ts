import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const keepQuantity = {
  id: "01a07209-6b51-795a-b1ac-3a82ccdac7c2",
  type: "page-type/temper-condition-field",
  slug: "keep-quantity",
  title: "Keep",
  key: "keepQuantity",
  description:
    "A rule names how many of the matching item to hold back from an outbound action such as sell or deconstruct, and no condition checker in this checkout reads the number.",
  createdAt: "2026-09-05T14:46:55.057Z",
  updatedAt: "2026-09-27T10:00:08.000Z",
} as const satisfies TemperConditionField
