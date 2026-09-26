import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const synergyEffectiveness = {
  id: "01a0de67-c00c-7f19-8ea1-e4e88100c3a4",
  type: "page-type/temper-metric",
  slug: "synergy-effectiveness",
  title: "Synergy Effectiveness",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
