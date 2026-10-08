import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const powerSpell = {
  id: "01a0de67-c00b-727f-9e53-5da10d0a5beb",
  type: "page-type/temper-metric",
  slug: "power-spell",
  title: "Spell Power",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_SPELL_POWER",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
