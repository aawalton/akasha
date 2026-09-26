import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const effectiveHealingSpell = {
  id: "01a0de67-c009-7753-934c-93ce2e5a0ecd",
  type: "page-type/temper-metric",
  slug: "effective-healing-spell",
  title: "Effective Spell Healing Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
