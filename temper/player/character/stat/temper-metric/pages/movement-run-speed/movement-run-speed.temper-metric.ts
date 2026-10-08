import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const movementRunSpeed = {
  id: "01a0de67-c00b-721f-ab91-71b44a525bec",
  type: "page-type/temper-metric",
  slug: "movement-run-speed",
  title: "Run Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
