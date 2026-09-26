import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionTpsBuff = {
  id: "01a0df07-1cd5-7f78-82c3-907a701655e4",
  type: "page-type/temper-metric",
  slug: "companion-tps-buff",
  title: "Buff Toughness",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
