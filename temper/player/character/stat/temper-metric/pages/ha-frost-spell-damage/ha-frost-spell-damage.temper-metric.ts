import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haFrostSpellDamage = {
  id: "01a0de67-c009-77ba-8cd6-4223f32c63ec",
  type: "page-type/temper-metric",
  slug: "ha-frost-spell-damage",
  title: "HA Frost Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
