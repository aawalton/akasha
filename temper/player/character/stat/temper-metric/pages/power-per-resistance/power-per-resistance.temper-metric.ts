import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const powerPerResistance = {
  id: "01a159fc-e52f-7b6a-8dd5-c2e53ed45297",
  type: "page-type/temper-metric",
  slug: "power-per-resistance",
  title: "Power per Resistance",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-20T15:45:08.398Z",
  updatedAt: "2026-10-20T15:45:08.398Z",
} as const satisfies TemperMetric
