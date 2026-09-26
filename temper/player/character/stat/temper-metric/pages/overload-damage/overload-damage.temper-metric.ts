import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const overloadDamage = {
  id: "01a0de67-c00b-710a-8937-cdf26f836874",
  type: "page-type/temper-metric",
  slug: "overload-damage",
  title: "Overload Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
