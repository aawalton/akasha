import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const healingCriticalBonus = {
  id: "01a0df49-5528-7274-a741-cf80a8bce37b",
  type: "page-type/temper-base-stat",
  slug: "healing-critical-bonus",
  title: "Base Healing Critical Bonus",
  metric: "temper-metric/healing-critical-bonus",
  effectType: "fractional-change",
  value: 0.5,
  createdAt: "2026-09-26T19:55:20.232Z",
  updatedAt: "2026-09-26T19:55:28.000Z",
} as const satisfies TemperBaseStat
