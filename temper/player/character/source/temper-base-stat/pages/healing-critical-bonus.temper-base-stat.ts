import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const healingCriticalBonus = {
  id: "01a0df49-5528-7274-a741-cf80a8bce37b",
  type: "page-type/temper-base-stat",
  slug: "healing-critical-bonus",
  title: "Base Healing Critical Bonus",
  metric: "temper-metric/healing-critical-bonus",
  effectType: "fractional-change",
  value: 0.5,
} as const satisfies TemperBaseStat
