import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const staminaDodgeCost = {
  id: "01a0df49-5528-700d-8133-cb1178c94ca8",
  type: "page-type/temper-base-stat",
  slug: "stamina-dodge-cost",
  title: "Base Dodge Cost",
  metric: "temper-metric/stamina-dodge-cost",
  effectType: "integer",
  value: 4040,
  createdAt: "2026-09-26T19:55:20.232Z",
  updatedAt: "2026-09-26T19:55:28.000Z",
} as const satisfies TemperBaseStat
