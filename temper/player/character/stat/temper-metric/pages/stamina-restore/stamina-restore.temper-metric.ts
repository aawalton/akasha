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
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
