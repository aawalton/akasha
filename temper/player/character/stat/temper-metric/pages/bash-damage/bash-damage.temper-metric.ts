import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const bashDamage = {
  id: "01a0de67-c007-759c-a93e-89ce6e67b5bc",
  type: "page-type/temper-metric",
  slug: "bash-damage",
  title: "Bash Damage",
  category: "advanced",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BASH_DAMAGE",
  esoStatValuePart: "flat",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
