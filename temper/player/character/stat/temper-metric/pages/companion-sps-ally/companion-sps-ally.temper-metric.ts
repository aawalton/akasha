import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionSpsAlly = {
  id: "01a0df07-1cd5-7916-aeb3-09fb2afd060a",
  type: "page-type/temper-metric",
  slug: "companion-sps-ally",
  title: "Ally Shielding Per Second",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
