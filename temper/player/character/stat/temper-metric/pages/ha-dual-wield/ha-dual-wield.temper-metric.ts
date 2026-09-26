import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haDualWield = {
  id: "01a0de67-c009-74da-bdfb-88bfe5b68fd5",
  type: "page-type/temper-metric",
  slug: "ha-dual-wield",
  title: "HA Dual Wield",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
