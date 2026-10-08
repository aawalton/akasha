import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const stealthDetection = {
  id: "01a0de67-c00c-7e0f-b56d-2e308b858333",
  type: "page-type/temper-metric",
  slug: "stealth-detection",
  title: "Stealth Detection Radius",
  valueType: "number-per-second",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
