import type { TemperRotationBreakdownRow } from "akasha/temper/progress/temper-rotation-breakdown-row/temper-rotation-breakdown-row.page-type.types.ts"

export const sps = {
  id: "019e5d79-3e55-7eb3-863e-aaba96922048",
  type: "temper-rotation-breakdown-row",
  slug: "sps",
  title: "SPS",
  key: "sps",
  description: "Average shielding applied per second",
  fullName: "Shielding Per Second",
} as const satisfies TemperRotationBreakdownRow
