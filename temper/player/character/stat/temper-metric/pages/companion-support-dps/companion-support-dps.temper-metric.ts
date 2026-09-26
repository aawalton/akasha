import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionSupportDps = {
  id: "01a0df07-1cd5-75cf-8cbc-35e7aa272236",
  type: "page-type/temper-metric",
  slug: "companion-support-dps",
  title: "Support DPS",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
