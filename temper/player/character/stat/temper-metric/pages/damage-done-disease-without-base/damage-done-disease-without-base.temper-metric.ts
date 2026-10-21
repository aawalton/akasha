import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneDiseaseWithoutBase = {
  id: "01a15c71-4dd4-7507-8dab-b6f043e6f328",
  type: "page-type/temper-metric",
  slug: "damage-done-disease-without-base",
  title: "Damage Done (Disease) Without Base",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:11:31.795Z",
  updatedAt: "2026-10-21T03:11:31.795Z",
} as const satisfies TemperMetric
