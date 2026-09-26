import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const ultimateRecovery = {
  id: "01a0de67-c00d-75a2-9e67-a8a6e824b6c0",
  type: "page-type/temper-metric",
  slug: "ultimate-recovery",
  title: "Ultimate Recovery",
  category: "advanced",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_ULTIMATE_REGEN_COMBAT",
  esoStatValuePart: "flat",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
