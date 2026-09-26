import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const criticalDamage = {
  id: "01a0df49-5528-72a0-9bbd-9600cb59eb07",
  type: "page-type/temper-base-stat",
  slug: "critical-damage",
  title: "Base Critical Damage",
  metric: "temper-metric/critical-damage",
  effectType: "fractional-change",
  value: 0.5,
} as const satisfies TemperBaseStat
