import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneDirectMonsters = {
  id: "01a15f66-1651-73e6-87b3-985eafb62cf0",
  type: "page-type/temper-metric",
  slug: "damage-done-direct-monsters",
  title: "Damage Done (Direct, Monsters)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T16:58:08.337Z",
  updatedAt: "2026-10-21T16:58:08.337Z",
} as const satisfies TemperMetric
