import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const criticalRating = {
  id: "01a0df49-5528-70d6-96aa-b86cdbb337ec",
  type: "page-type/temper-base-stat",
  slug: "critical-rating",
  title: "Base Critical Rating",
  metric: "temper-metric/critical-rating",
  effectType: "integer",
  value: 2181,
  createdAt: "2026-09-26T19:55:20.232Z",
  updatedAt: "2026-09-26T19:55:28.000Z",
} as const satisfies TemperBaseStat
