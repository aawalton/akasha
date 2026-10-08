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
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
