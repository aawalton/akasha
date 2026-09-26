import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const defenseCritDmg = {
  id: "01a0de67-c009-7241-a152-cc9428bb3167",
  type: "page-type/temper-metric",
  slug: "defense-crit-dmg",
  title: "Defense Crit Damage",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
