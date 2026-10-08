import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const staminaMaximum = {
  id: "01a0de67-c00c-7adf-ad82-f252e8eb45d1",
  type: "page-type/temper-metric",
  slug: "stamina-maximum",
  title: "Max Stamina",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_STAMINA_MAX",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
