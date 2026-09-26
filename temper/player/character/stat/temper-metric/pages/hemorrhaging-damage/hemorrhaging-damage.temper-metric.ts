import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const hemorrhagingDamage = {
  id: "01a0de67-c00a-7082-a65e-540bd81dbdb7",
  type: "page-type/temper-metric",
  slug: "hemorrhaging-damage",
  title: "Hemorrhaging Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
