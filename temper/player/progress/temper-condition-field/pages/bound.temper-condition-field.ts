import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const bound = {
  id: "01a07209-6b4f-744d-b9df-baed60794cad",
  type: "page-type/temper-condition-field",
  slug: "bound",
  title: "Bound",
  key: "bound",
  description:
    "An item's bound flag must be true where the value is `bound` and false where the value is `not-bound`.",
  createdAt: "2026-09-05T14:46:55.055Z",
  updatedAt: "2026-09-21T15:33:05.000Z",
} as const satisfies TemperConditionField
