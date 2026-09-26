import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const staminaRecoveryIdle = {
  id: "01a0de67-c00c-7591-91c8-67b84ad58f6f",
  type: "page-type/temper-metric",
  slug: "stamina-recovery-idle",
  title: "Stamina Recovery (Idle)",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_STAMINA_REGEN_IDLE",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
