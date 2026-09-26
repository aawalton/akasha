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
} as const satisfies TemperMetric
