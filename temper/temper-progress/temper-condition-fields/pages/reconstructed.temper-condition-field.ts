import type { TemperConditionField } from "../temper-condition-field.page-type.ts"

export const reconstructed = {
  id: "01a07209-6b52-762e-b29d-4e544f4a7836",
  pageTypeSlug: "temper-condition-field",
  slug: "reconstructed",
  title: "Reconstructed",
  key: "reconstructed",
  description:
    "An item's reconstructed flag must be true where the value is `reconstructed` and false where the value is `not-reconstructed`, and the test suits equipment alone.",
} as const satisfies TemperConditionField
