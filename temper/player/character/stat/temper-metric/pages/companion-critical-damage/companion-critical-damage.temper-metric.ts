import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionCriticalDamage = {
  id: "01a0df07-1cd4-78a1-994d-ad37a547961f",
  type: "page-type/temper-metric",
  slug: "companion-critical-damage",
  title: "Critical Damage",
  subject: "companion",
  valueType: "fractional-change",
  effectType: "fractional-change",
} as const satisfies TemperMetric
