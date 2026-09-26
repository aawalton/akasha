import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const movementWalkSpeed = {
  id: "01a0df49-5528-72ee-93db-81a8fb9335bb",
  type: "page-type/temper-base-stat",
  slug: "movement-walk-speed",
  title: "Base Walk Speed",
  metric: "temper-metric/movement-walk-speed",
  effectType: "fractional-change",
  value: 0.3,
} as const satisfies TemperBaseStat
