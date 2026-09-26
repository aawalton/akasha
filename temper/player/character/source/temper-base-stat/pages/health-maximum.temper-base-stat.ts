import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const healthMaximum = {
  id: "01a0df49-5528-73a5-9a6b-b16dc16abfc8",
  type: "page-type/temper-base-stat",
  slug: "health-maximum",
  title: "Base Max Health",
  metric: "temper-metric/health-maximum",
  effectType: "integer",
  value: 16000,
} as const satisfies TemperBaseStat
