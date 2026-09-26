import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusShockSpellDamage = {
  id: "01a0de67-c00c-7aea-b03c-6300f74d5e0a",
  type: "page-type/temper-metric",
  slug: "status-shock-spell-damage",
  title: "Status Shock Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
