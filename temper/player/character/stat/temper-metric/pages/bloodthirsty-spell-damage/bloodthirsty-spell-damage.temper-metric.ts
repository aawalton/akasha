import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const bloodthirstySpellDamage = {
  id: "01a0de67-c008-760c-8d1d-9b63aa693f10",
  type: "page-type/temper-metric",
  slug: "bloodthirsty-spell-damage",
  title: "Bloodthirsty Spell Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: false,
  formula: "ts",
} as const satisfies TemperMetric
