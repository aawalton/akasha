import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusPoisonSpellDamage = {
  id: "01a0de67-c00c-7cf3-b43b-ea53a51b3e52",
  type: "page-type/temper-metric",
  slug: "status-poison-spell-damage",
  title: "Status Poison Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
