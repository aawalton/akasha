import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const healthRecoveryIdle = {
  id: "01a0de67-c00a-7a73-984c-6b667b75decd",
  type: "page-type/temper-metric",
  slug: "health-recovery-idle",
  title: "Health Recovery (Idle)",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_HEALTH_REGEN_IDLE",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
