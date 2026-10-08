import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const chilledDamage = {
  id: "01a0de67-c008-70f4-afd6-1ed67dcd07bc",
  type: "page-type/temper-metric",
  slug: "chilled-damage",
  title: "Chilled Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.456Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
