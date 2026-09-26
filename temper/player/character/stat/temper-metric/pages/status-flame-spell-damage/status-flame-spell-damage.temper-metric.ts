import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusFlameSpellDamage = {
  id: "01a0de67-c00c-79d3-98bd-5d90df280203",
  type: "page-type/temper-metric",
  slug: "status-flame-spell-damage",
  title: "Status Flame Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
