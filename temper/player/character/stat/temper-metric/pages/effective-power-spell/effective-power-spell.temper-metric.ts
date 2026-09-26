import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const effectivePowerSpell = {
  id: "01a0de67-c009-7afc-a45e-1dadf4247fb7",
  type: "page-type/temper-metric",
  slug: "effective-power-spell",
  title: "Effective Spell Power",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
