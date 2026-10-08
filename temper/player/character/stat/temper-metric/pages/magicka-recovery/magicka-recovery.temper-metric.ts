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
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
