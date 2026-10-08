import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const statusBleedSpellDamage = {
  id: "01a0de67-c00c-78fb-9516-6f8e61c106a2",
  type: "page-type/temper-metric",
  slug: "status-bleed-spell-damage",
  title: "Status Bleed Spell Damage",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.460Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
