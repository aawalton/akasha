import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const sprintCostReduction = {
  id: "01a15c60-687b-73de-950b-c019d9e1c966",
  type: "page-type/temper-metric",
  slug: "sprint-cost-reduction",
  title: "Sprint Cost Reduction",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T02:53:04.507Z",
  updatedAt: "2026-10-21T02:53:04.507Z",
} as const satisfies TemperMetric
