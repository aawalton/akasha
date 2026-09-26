import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const concussionDamage = {
  id: "01a0de67-c008-7246-b1da-c86de2134cb7",
  type: "page-type/temper-metric",
  slug: "concussion-damage",
  title: "Concussion Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
