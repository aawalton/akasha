import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const movementSwimSpeed = {
  id: "01a0df49-5528-7acb-ba53-db7d156aa729",
  type: "page-type/temper-base-stat",
  slug: "movement-swim-speed",
  title: "Base Swim Speed",
  metric: "temper-metric/movement-swim-speed",
  effectType: "fractional-change",
  value: 0.6,
} as const satisfies TemperBaseStat
