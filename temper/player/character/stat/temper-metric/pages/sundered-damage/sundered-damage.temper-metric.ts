import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const sunderedDamage = {
  id: "01a0de67-c00c-71fb-bc8a-72580f1abeae",
  type: "page-type/temper-metric",
  slug: "sundered-damage",
  title: "Sundered Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
