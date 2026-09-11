import type { TemperRotationBreakdownRow } from "akasha/temper/progressions/temper-rotation-breakdown-rows/temper-rotation-breakdown-row.page-type.types.ts"

export const dpc = {
  id: "019e5d79-3e4f-7eb1-b051-87789d5ba591",
  type: "temper-rotation-breakdown-row",
  slug: "dpc",
  title: "DPC",
  key: "dpc",
  description: "Average damage dealt per skill cast",
  fullName: "Damage Per Cast",
} as const satisfies TemperRotationBreakdownRow
