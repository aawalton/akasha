import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const replacementValue = {
  id: "01a07209-6b53-7c76-ac1d-e3beb5bc0786",
  type: "page-type/temper-condition-field",
  slug: "replacement-value",
  title: "Replacement Value",
  key: "replacementValue",
  description:
    "An item's replacement value, read as zero where absent, is compared against the number or named constant stated, under `<=` by default.",
  createdAt: "2026-09-05T14:46:55.059Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
