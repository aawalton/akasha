import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionTpsSelfHps = {
  id: "01a0df07-1cd5-7911-9276-1a2c9e1e96b9",
  type: "page-type/temper-metric",
  slug: "companion-tps-self-hps",
  title: "Self Healing Per Second",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
