import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const burningDamage = {
  id: "01a0de67-c008-7927-b8df-680ede384686",
  type: "page-type/temper-metric",
  slug: "burning-damage",
  title: "Burning Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
