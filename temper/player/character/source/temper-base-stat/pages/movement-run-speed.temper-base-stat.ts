import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const movementRunSpeed = {
  id: "01a0df49-5528-7eaf-869a-bb1c878b8985",
  type: "page-type/temper-base-stat",
  slug: "movement-run-speed",
  title: "Base Run Speed",
  metric: "temper-metric/movement-run-speed",
  effectType: "fractional-change",
  value: 1,
} as const satisfies TemperBaseStat
