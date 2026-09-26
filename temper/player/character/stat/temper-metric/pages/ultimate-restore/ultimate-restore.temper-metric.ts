import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const ultimateRestore = {
  id: "01a0de67-c00d-7f75-bd8b-b0bfbbb70602",
  type: "page-type/temper-metric",
  slug: "ultimate-restore",
  title: "Ultimate Restore",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
