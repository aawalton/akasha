import type { TemperBaseStat } from "akasha/temper/player/character/source/temper-base-stat/temper-base-stat.page-type.types.ts"

export const stealthDetection = {
  id: "01a0df49-5528-7e1f-a551-5280f4ae9fc8",
  type: "page-type/temper-base-stat",
  slug: "stealth-detection",
  title: "Base Stealth Detection Radius",
  metric: "temper-metric/stealth-detection",
  effectType: "integer",
  value: 6.5,
} as const satisfies TemperBaseStat
