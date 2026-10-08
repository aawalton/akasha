import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const movementSneakPenalty = {
  id: "01a0df49-5528-79b9-8aad-c25b137795da",
  type: "page-type/temper-base-stat",
  slug: "movement-sneak-penalty",
  title: "Base Sneak Penalty",
  metric: "temper-metric/movement-sneak-penalty",
  effectType: "fractional-change",
  value: -0.4,
  createdAt: "2026-09-26T19:55:20.232Z",
  updatedAt: "2026-09-26T19:55:28.000Z",
} as const satisfies TemperBaseStat
