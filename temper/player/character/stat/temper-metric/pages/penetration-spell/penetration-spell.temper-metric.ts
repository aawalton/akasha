import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const penetrationSpell = {
  id: "01a0de67-c00b-7479-be28-3cce86a693f5",
  type: "page-type/temper-metric",
  slug: "penetration-spell",
  title: "Spell Penetration",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_SPELL_PENETRATION",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
