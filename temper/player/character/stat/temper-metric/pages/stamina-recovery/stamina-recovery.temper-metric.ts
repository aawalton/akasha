import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const staminaRecovery = {
  id: "01a0de67-c00c-7280-bbd1-f07f06fd9139",
  type: "page-type/temper-metric",
  slug: "stamina-recovery",
  title: "Stamina Recovery",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_STAMINA_REGEN_COMBAT",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
