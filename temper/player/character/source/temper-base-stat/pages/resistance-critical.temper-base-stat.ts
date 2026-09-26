import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const resistanceCritical = {
  id: "01a0df49-5528-70bd-b2bd-3bef26a9b239",
  type: "page-type/temper-base-stat",
  slug: "resistance-critical",
  title: "Base Critical Resistance",
  metric: "temper-metric/resistance-critical",
  effectType: "integer",
  value: 1320,
} as const satisfies TemperBaseStat
