import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haShockSpellDamage = {
  id: "01a0de67-c00a-7adc-b3fd-a5f7d719474d",
  type: "page-type/temper-metric",
  slug: "ha-shock-spell-damage",
  title: "HA Shock Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
