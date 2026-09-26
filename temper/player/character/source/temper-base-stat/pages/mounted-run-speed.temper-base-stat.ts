import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const mountedRunSpeed = {
  id: "01a0df49-5528-71cc-b7f2-24440b1e83e7",
  type: "page-type/temper-base-stat",
  slug: "mounted-run-speed",
  title: "Base Mounted Run Speed",
  metric: "temper-metric/mounted-run-speed",
  effectType: "fractional-change",
  value: 1.45,
} as const satisfies TemperBaseStat
