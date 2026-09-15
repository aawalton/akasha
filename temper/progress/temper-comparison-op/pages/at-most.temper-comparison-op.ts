import type { TemperComparisonOp } from "akasha/temper/progress/temper-comparison-op/temper-comparison-op.page-type.types.ts"

export const atMost = {
  id: "01a05fc9-c60e-74db-b896-409f8afaaf9f",
  type: "page-type/temper-comparison-op",
  slug: "at-most",
  title: "≤",
  key: "<=",
} as const satisfies TemperComparisonOp
