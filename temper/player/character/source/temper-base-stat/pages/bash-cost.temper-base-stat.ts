import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const bashCost = {
  id: "01a0df49-5527-7f2d-b284-0d1bfcb0a421",
  type: "page-type/temper-base-stat",
  slug: "bash-cost",
  title: "Base Bash Cost",
  metric: "temper-metric/bash-cost",
  effectType: "integer",
  value: 765,
} as const satisfies TemperBaseStat
