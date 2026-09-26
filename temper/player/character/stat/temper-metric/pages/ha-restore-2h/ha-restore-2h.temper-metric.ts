import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haRestore2h = {
  id: "01a0de67-c00a-726d-9822-9e442f860311",
  type: "page-type/temper-metric",
  slug: "ha-restore-2h",
  title: "HA Restore (2H)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
