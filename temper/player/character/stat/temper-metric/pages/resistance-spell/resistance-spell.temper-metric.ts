import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const resistanceSpell = {
  id: "01a0de67-c00c-7e5b-9ef7-8718134d62d0",
  type: "page-type/temper-metric",
  slug: "resistance-spell",
  title: "Spell Resistance",
  category: "base",
  valueType: "rating",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_SPELL_RESIST",
  divisor: 66000,
  cap: 0.5,
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
