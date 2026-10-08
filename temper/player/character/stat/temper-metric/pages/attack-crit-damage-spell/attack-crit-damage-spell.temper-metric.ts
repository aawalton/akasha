import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const attackCritDamageSpell = {
  id: "01a0de67-c007-705b-857f-c7f86798eddc",
  type: "page-type/temper-metric",
  slug: "attack-crit-damage-spell",
  title: "Attack Spell Critical Damage",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.455Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
