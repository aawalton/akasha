import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haSpeed = {
  id: "01a0de67-c00a-7c1f-b451-bf68c0c35179",
  type: "page-type/temper-metric",
  slug: "ha-speed",
  title: "HA Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
