import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const magickaRecovery = {
  id: "01a0de67-c00b-7ff2-a309-03dda432af26",
  type: "page-type/temper-metric",
  slug: "magicka-recovery",
  title: "Magicka Recovery",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_MAGICKA_REGEN_COMBAT",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
