import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneMonsters = {
  id: "01a15f77-087a-7582-9fab-1d1d7da784e5",
  type: "page-type/temper-metric",
  slug: "damage-done-monsters",
  title: "Damage Done (Monsters)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T17:16:38.906Z",
  updatedAt: "2026-10-21T17:16:38.906Z",
} as const satisfies TemperMetric
