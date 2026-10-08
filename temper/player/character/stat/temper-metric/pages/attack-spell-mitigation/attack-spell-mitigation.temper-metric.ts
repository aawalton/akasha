import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const attackSpellMitigation = {
  id: "01a0de67-c007-746d-8d6b-82c75a406645",
  type: "page-type/temper-metric",
  slug: "attack-spell-mitigation",
  title: "Attack Spell Mitigation",
  valueType: "fractional-change",
  polarity: "lower-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.455Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
