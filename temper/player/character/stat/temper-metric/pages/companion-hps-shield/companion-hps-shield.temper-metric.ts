import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionHpsShield = {
  id: "01a0df07-1cd5-7d1d-98f8-f9cc9e32a0ff",
  type: "page-type/temper-metric",
  slug: "companion-hps-shield",
  title: "Shield Healing Per Second",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
