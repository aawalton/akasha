import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDonePoisonWithoutBase = {
  id: "01a15c71-4dd5-7d0e-89f1-0d8646267d1e",
  type: "page-type/temper-metric",
  slug: "damage-done-poison-without-base",
  title: "Damage Done (Poison) Without Base",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:11:31.795Z",
  updatedAt: "2026-10-21T03:11:31.795Z",
} as const satisfies TemperMetric
