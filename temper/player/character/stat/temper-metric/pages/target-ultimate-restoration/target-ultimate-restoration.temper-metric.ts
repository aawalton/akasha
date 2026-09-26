import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetUltimateRestoration = {
  id: "01a0de67-c00c-747b-aff8-2face151c107",
  type: "page-type/temper-metric",
  slug: "target-ultimate-restoration",
  title: "Target Ultimate Restoration",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
