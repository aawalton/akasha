import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haFlameSpellDamage = {
  id: "01a0de67-c009-7cb2-aeaa-d541fafc3e96",
  type: "page-type/temper-metric",
  slug: "ha-flame-spell-damage",
  title: "HA Flame Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
