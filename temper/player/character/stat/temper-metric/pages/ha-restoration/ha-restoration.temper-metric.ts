import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haRestoration = {
  id: "01a0de67-c00a-7934-8c87-e424aa7a166f",
  type: "page-type/temper-metric",
  slug: "ha-restoration",
  title: "HA Restoration",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
