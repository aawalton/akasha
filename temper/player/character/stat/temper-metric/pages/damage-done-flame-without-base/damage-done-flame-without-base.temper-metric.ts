import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneFlameWithoutBase = {
  id: "01a15c71-4dd5-7c21-aa75-51cca36e2d0d",
  type: "page-type/temper-metric",
  slug: "damage-done-flame-without-base",
  title: "Damage Done (Flame) Without Base",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:11:31.795Z",
  updatedAt: "2026-10-21T03:11:31.795Z",
} as const satisfies TemperMetric
