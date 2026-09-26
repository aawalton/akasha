import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laFlameSpellDamage = {
  id: "01a0de67-c00a-7e92-bdda-aa5198086a2d",
  type: "page-type/temper-metric",
  slug: "la-flame-spell-damage",
  title: "LA Flame Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
