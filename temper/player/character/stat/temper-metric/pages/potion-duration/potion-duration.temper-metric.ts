import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const potionDuration = {
  id: "01a0de67-c00b-7379-87f4-e2169c20ab8c",
  type: "page-type/temper-metric",
  slug: "potion-duration",
  title: "Potion Duration",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
