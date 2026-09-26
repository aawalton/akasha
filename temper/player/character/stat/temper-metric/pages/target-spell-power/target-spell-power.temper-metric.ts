import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetSpellPower = {
  id: "01a0de67-c00c-7f5d-b3ca-f4cc24a27f56",
  type: "page-type/temper-metric",
  slug: "target-spell-power",
  title: "Target Spell Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
