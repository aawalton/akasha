import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionUltimateGeneration = {
  id: "01a0df07-1cd5-7951-960b-bbc8da4f27fb",
  type: "page-type/temper-metric",
  slug: "companion-ultimate-generation",
  title: "Ultimate Generation",
  subject: "companion",
  valueType: "fractional-change",
  effectType: "fractional-change",
} as const satisfies TemperMetric
