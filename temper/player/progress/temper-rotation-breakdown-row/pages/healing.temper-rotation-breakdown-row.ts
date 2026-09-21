import type { TemperRotationBreakdownRow } from "akasha/temper/player/progress/temper-rotation-breakdown-row/temper-rotation-breakdown-row.page-type.types.ts"

export const healing = {
  id: "019e5d79-3e52-7c78-9ca0-3fb2c336ea7e",
  type: "page-type/temper-rotation-breakdown-row",
  slug: "healing",
  title: "Healing",
  key: "healing",
  description: "Total healing done over the rotation",
  fullName: "Total Healing",
} as const satisfies TemperRotationBreakdownRow
