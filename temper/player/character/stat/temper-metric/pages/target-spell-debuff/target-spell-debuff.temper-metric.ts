import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const targetSpellDebuff = {
  id: "01a0de67-c00c-7c56-adcc-88f934917d56",
  type: "page-type/temper-metric",
  slug: "target-spell-debuff",
  title: "Target Spell Debuff",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
