import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const staminaDodgeBaseCost = {
  id: "01a0df49-5528-700d-8133-cb1178c94ca8",
  type: "page-type/temper-base-stat",
  slug: "stamina-dodge-base-cost",
  title: "Base Dodge Cost",
  metric: "temper-metric/stamina-dodge-base-cost",
  effectType: "integer",
  value: 4040,
  createdAt: "2026-09-26T19:55:20.232Z",
  updatedAt: "2026-10-20T20:37:38.144Z",
} as const satisfies TemperBaseStat
