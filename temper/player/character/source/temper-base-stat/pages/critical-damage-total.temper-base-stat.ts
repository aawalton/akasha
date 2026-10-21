import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const criticalDamageTotal = {
  id: "01a0df49-5528-72a0-9bbd-9600cb59eb07",
  type: "page-type/temper-base-stat",
  slug: "critical-damage-total",
  title: "Base Critical Damage",
  metric: "temper-metric/critical-damage-total",
  effectType: "fractional-change",
  value: 0.5,
  createdAt: "2026-09-26T19:55:20.232Z",
  updatedAt: "2026-10-21T02:13:18.790Z",
} as const satisfies TemperBaseStat
