import type { TemperRotationBreakdownRow } from "akasha/temper/progress/temper-rotation-breakdown-row/temper-rotation-breakdown-row.page-type.types.ts"

export const tps = {
  id: "019e5d79-3e5c-7ef5-bf06-fa5a7d27e26a",
  type: "page-type/temper-rotation-breakdown-row",
  slug: "tps",
  title: "TPS",
  key: "tps",
  description: "Effective health contribution from defensive effects",
  fullName: "Average Effective Health",
} as const satisfies TemperRotationBreakdownRow
