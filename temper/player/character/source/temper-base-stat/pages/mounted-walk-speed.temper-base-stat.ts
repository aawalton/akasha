import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const mountedWalkSpeed = {
  id: "01a0df49-5528-7b50-af9d-23cdaab3a320",
  type: "page-type/temper-base-stat",
  slug: "mounted-walk-speed",
  title: "Base Mounted Walk Speed",
  metric: "temper-metric/mounted-walk-speed",
  effectType: "fractional-change",
  value: 1.15,
} as const satisfies TemperBaseStat
