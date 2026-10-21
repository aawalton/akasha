import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneFrostWithoutBase = {
  id: "01a15c71-4dd5-7ed6-8da0-b85cb9954b1c",
  type: "page-type/temper-metric",
  slug: "damage-done-frost-without-base",
  title: "Damage Done (Frost) Without Base",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:11:31.795Z",
  updatedAt: "2026-10-21T03:11:31.795Z",
} as const satisfies TemperMetric
