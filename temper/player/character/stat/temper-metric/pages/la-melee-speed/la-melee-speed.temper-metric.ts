import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laMeleeSpeed = {
  id: "01a0de67-c00a-7049-a964-4ca1077ddcf1",
  type: "page-type/temper-metric",
  slug: "la-melee-speed",
  title: "LA Melee Speed",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
