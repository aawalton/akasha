import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionCriticalHealing = {
  id: "01a0df07-1cd4-7102-904f-48e252cc269a",
  type: "page-type/temper-metric",
  slug: "companion-critical-healing",
  title: "Critical Healing",
  subject: "companion",
  valueType: "fractional-change",
  effectType: "fractional-change",
} as const satisfies TemperMetric
