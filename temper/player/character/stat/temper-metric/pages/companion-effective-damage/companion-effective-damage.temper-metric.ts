import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionEffectiveDamage = {
  id: "01a0df07-1cd5-72ec-b200-7428f9c75523",
  type: "page-type/temper-metric",
  slug: "companion-effective-damage",
  title: "Effective Power",
  subject: "companion",
  valueType: "integer",
  formula: "ts",
} as const satisfies TemperMetric
