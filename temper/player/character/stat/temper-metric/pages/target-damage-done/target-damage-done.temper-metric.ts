import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetDamageDone = {
  id: "01a0de67-c00c-7955-ac7e-97d84e7e2c8b",
  type: "page-type/temper-metric",
  slug: "target-damage-done",
  title: "Target Damage Done",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
