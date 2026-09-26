import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const criticalRating = {
  id: "01a0df49-5528-70d6-96aa-b86cdbb337ec",
  type: "page-type/temper-base-stat",
  slug: "critical-rating",
  title: "Base Critical Rating",
  metric: "temper-metric/critical-rating",
  effectType: "integer",
  value: 2181,
} as const satisfies TemperBaseStat
