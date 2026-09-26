import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusMagicSpellDamage = {
  id: "01a0de67-c00c-7c3a-92b7-6125ca8662ad",
  type: "page-type/temper-metric",
  slug: "status-magic-spell-damage",
  title: "Status Magic Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
