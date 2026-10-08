import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const breakFreeCost = {
  id: "01a0df49-5528-7b21-9a0c-f2abcb8756f3",
  type: "page-type/temper-base-stat",
  slug: "break-free-cost",
  title: "Base Break Free Cost",
  metric: "temper-metric/break-free-cost",
  effectType: "integer",
  value: 5400,
  createdAt: "2026-09-26T19:55:20.232Z",
  updatedAt: "2026-09-26T19:55:28.000Z",
} as const satisfies TemperBaseStat
