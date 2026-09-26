import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const criticalDamageSpell = {
  id: "01a0de67-c008-7e73-9250-9c6d20106e80",
  type: "page-type/temper-metric",
  slug: "critical-damage-spell",
  title: "Spell Critical Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
