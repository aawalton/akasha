import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const laMagicSpellDamage = {
  id: "01a0de67-c00a-7b9c-b8af-70ead2409443",
  type: "page-type/temper-metric",
  slug: "la-magic-spell-damage",
  title: "LA Magic Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
