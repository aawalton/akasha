import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetHealingReceived = {
  id: "01a0de67-c00c-7b0c-9c94-de4995893136",
  type: "page-type/temper-metric",
  slug: "target-healing-received",
  title: "Target Healing Received",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
