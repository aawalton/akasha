import type { TemperRotationBreakdownRow } from "akasha/temper/progress/temper-rotation-breakdown-row/temper-rotation-breakdown-row.page-type.types.ts"

export const dPercent = {
  id: "019e5d79-3e4a-7771-8cbe-fa00b9e453b4",
  type: "temper-rotation-breakdown-row",
  slug: "d-percent",
  title: "D %",
  key: "d-percent",
  description: "Percentage of total damage dealt",
  fullName: "Damage Percent",
} as const satisfies TemperRotationBreakdownRow
