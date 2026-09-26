import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const staminaRestore = {
  id: "01a0de67-c00c-7845-af39-1bcde16b8ee6",
  type: "page-type/temper-metric",
  slug: "stamina-restore",
  title: "Restore Stamina",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
