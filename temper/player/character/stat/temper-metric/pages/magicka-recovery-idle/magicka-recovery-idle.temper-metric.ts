import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const magickaRecoveryIdle = {
  id: "01a0de67-c00b-7b11-a815-f543a46acfd3",
  type: "page-type/temper-metric",
  slug: "magicka-recovery-idle",
  title: "Magicka Recovery (Idle)",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_MAGICKA_REGEN_IDLE",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
