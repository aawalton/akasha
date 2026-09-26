import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionEffectiveToughness = {
  id: "01a0df07-1cd5-78f2-a348-fd9ec5aaaa77",
  type: "page-type/temper-metric",
  slug: "companion-effective-toughness",
  title: "Effective Health",
  subject: "companion",
  valueType: "integer",
  formula: "ts",
} as const satisfies TemperMetric
