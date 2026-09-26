import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haMagicSpellDamage = {
  id: "01a0de67-c009-79e4-9826-0cfb77b4cf88",
  type: "page-type/temper-metric",
  slug: "ha-magic-spell-damage",
  title: "HA Magic Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
