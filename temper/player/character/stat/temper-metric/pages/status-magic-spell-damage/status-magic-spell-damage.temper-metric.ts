import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusMagicSpellDamage = {
  id: "01a0de67-c00c-7c3a-92b7-6125ca8662ad",
  type: "page-type/temper-metric",
  slug: "status-magic-spell-damage",
  title: "Status Magic Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
