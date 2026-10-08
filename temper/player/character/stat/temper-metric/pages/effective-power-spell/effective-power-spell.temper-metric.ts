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
  createdAt: "2026-09-26T15:48:56.457Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
