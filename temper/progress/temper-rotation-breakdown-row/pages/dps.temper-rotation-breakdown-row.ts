import type { TemperRotationBreakdownRow } from "akasha/temper/progress/temper-rotation-breakdown-row/temper-rotation-breakdown-row.page-type.types.ts"

export const dps = {
  id: "019e5d79-3e4d-7336-9e7b-c551cecef7d7",
  type: "page-type/temper-rotation-breakdown-row",
  slug: "dps",
  title: "DPS",
  key: "dps",
  description: "Average damage dealt per second",
  fullName: "Damage Per Second",
} as const satisfies TemperRotationBreakdownRow
