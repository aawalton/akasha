import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDonePhysicalWithoutBase = {
  id: "01a15c71-4dd5-744a-a96a-d9295231e243",
  type: "page-type/temper-metric",
  slug: "damage-done-physical-without-base",
  title: "Damage Done (Physical) Without Base",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:11:31.795Z",
  updatedAt: "2026-10-21T03:11:31.795Z",
} as const satisfies TemperMetric
