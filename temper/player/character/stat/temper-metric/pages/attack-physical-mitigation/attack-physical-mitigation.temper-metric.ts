import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const attackPhysicalMitigation = {
  id: "01a0de67-c007-7679-b196-6c67e156270e",
  type: "page-type/temper-metric",
  slug: "attack-physical-mitigation",
  title: "Attack Physical Mitigation",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.455Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
