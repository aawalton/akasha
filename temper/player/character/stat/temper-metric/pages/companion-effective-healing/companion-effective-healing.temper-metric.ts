import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionEffectiveHealing = {
  id: "01a0df07-1cd5-7037-a2e4-c85ac84aa14e",
  type: "page-type/temper-metric",
  slug: "companion-effective-healing",
  title: "Healing",
  subject: "companion",
  valueType: "integer",
  formula: "ts",
} as const satisfies TemperMetric
