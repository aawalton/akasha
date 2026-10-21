import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneBleedWithoutBase = {
  id: "01a15c71-4dd4-72c7-be3d-0374ef084963",
  type: "page-type/temper-metric",
  slug: "damage-done-bleed-without-base",
  title: "Damage Done (Bleed) Without Base",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:11:31.795Z",
  updatedAt: "2026-10-21T03:11:31.795Z",
} as const satisfies TemperMetric
