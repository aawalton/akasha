import type { TemperConditionField } from "akasha/temper/player/progress/temper-condition-field/temper-condition-field.page-type.types.ts"

export const uncollected = {
  id: "01a11bee-2aac-719f-8538-f7284c9c6d4f",
  type: "page-type/temper-condition-field",
  slug: "uncollected",
  title: "Uncollected",
  key: "uncollected",
  description:
    "An item must be a set piece the account's set collection lacks, and not bound, where the value is `uncollected`, and must not be where the value is `collected`; the test suits equipment alone.",
  createdAt: "2026-10-08T14:32:35.756Z",
  updatedAt: "2026-10-08T14:32:58.000Z",
} as const satisfies TemperConditionField
