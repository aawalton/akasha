import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laRestorationStaff = {
  id: "01a0de67-c00a-7aef-89d1-1de0753f69a8",
  type: "page-type/temper-metric",
  slug: "la-restoration-staff",
  title: "LA Restoration Staff",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
