import type { TemperComparisonOp } from "akasha/temper/player/progress/temper-comparison-op/temper-comparison-op.page-type.types.ts"

export const notEqualTo = {
  id: "01a05fc9-c60f-74a4-91b1-daeb6a521943",
  type: "page-type/temper-comparison-op",
  slug: "not-equal-to",
  title: "≠",
  key: "!=",
} as const satisfies TemperComparisonOp
