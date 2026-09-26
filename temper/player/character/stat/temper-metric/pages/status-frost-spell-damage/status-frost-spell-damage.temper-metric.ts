import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusFrostSpellDamage = {
  id: "01a0de67-c00c-717c-bb58-9d3473394d3e",
  type: "page-type/temper-metric",
  slug: "status-frost-spell-damage",
  title: "Status Frost Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
