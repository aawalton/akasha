import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laShockSpellDamage = {
  id: "01a0de67-c00a-77df-8e28-5a9ce4e451fe",
  type: "page-type/temper-metric",
  slug: "la-shock-spell-damage",
  title: "LA Shock Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.458Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
