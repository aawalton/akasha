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
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
