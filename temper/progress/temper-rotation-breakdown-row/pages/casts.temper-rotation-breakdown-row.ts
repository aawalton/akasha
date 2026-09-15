import type { TemperRotationBreakdownRow } from "akasha/temper/progress/temper-rotation-breakdown-row/temper-rotation-breakdown-row.page-type.types.ts"

export const casts = {
  id: "019e5d79-3e5a-75c8-be5d-d7cf27860199",
  type: "page-type/temper-rotation-breakdown-row",
  slug: "casts",
  title: "Casts",
  key: "casts",
  description: "Number of times the skill was used",
  fullName: "Total Casts",
} as const satisfies TemperRotationBreakdownRow
