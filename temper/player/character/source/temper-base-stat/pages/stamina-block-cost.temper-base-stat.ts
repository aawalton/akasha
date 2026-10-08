import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const staminaBlockCost = {
  id: "01a0df49-5528-772f-bb0e-a1c2174fea01",
  type: "page-type/temper-base-stat",
  slug: "stamina-block-cost",
  title: "Base Block Cost",
  metric: "temper-metric/stamina-block-cost",
  effectType: "integer",
  value: 1750,
  createdAt: "2026-09-26T19:55:20.232Z",
  updatedAt: "2026-09-26T19:55:28.000Z",
} as const satisfies TemperBaseStat
