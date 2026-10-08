import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetSpellResistance = {
  id: "01a0de67-c00c-7745-902e-aa8b39491aee",
  type: "page-type/temper-metric",
  slug: "target-spell-resistance",
  title: "Target Spell Resistance",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
