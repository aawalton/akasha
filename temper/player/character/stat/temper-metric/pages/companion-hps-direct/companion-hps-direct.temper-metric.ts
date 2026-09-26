import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionHpsDirect = {
  id: "01a0df07-1cd5-76e4-97c3-c1324a181edd",
  type: "page-type/temper-metric",
  slug: "companion-hps-direct",
  title: "Direct Healing Per Second",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
