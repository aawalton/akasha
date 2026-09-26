import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionSupportTps = {
  id: "01a0df07-1cd5-74d0-8a25-3e3699beda82",
  type: "page-type/temper-metric",
  slug: "companion-support-tps",
  title: "Support TPS",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
