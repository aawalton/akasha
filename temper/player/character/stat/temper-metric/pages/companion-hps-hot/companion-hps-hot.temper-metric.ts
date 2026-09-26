import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionHpsHot = {
  id: "01a0df07-1cd5-768e-add5-659814a7d612",
  type: "page-type/temper-metric",
  slug: "companion-hps-hot",
  title: "HoT Healing Per Second",
  subject: "companion",
  valueType: "integer",
} as const satisfies TemperMetric
