import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const poisonedDamage = {
  id: "01a0de67-c00b-7f9c-9dd4-66a1e7d616fc",
  type: "page-type/temper-metric",
  slug: "poisoned-damage",
  title: "Poisoned Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
