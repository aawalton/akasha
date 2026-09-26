import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const power = {
  id: "01a0de67-c00b-7681-8196-1bad4c6a77a6",
  type: "page-type/temper-metric",
  slug: "power",
  title: "Power",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_WEAPON_AND_SPELL_DAMAGE",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
