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
} as const satisfies TemperMetric
