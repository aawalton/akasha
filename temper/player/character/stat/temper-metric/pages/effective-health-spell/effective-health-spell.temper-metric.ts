import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const effectiveHealthSpell = {
  id: "01a0de67-c009-718b-8203-5bd1d8c7b79e",
  type: "page-type/temper-metric",
  slug: "effective-health-spell",
  title: "Effective Health (Spell)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
