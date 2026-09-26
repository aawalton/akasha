import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetPhysicalResistance = {
  id: "01a0de67-c00c-786c-9d63-59af5c32b02b",
  type: "page-type/temper-metric",
  slug: "target-physical-resistance",
  title: "Target Physical Resistance",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
