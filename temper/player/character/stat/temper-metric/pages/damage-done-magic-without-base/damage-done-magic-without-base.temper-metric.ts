import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneMagicWithoutBase = {
  id: "01a15c71-4dd5-7dc4-b63c-33877ab25709",
  type: "page-type/temper-metric",
  slug: "damage-done-magic-without-base",
  title: "Damage Done (Magic) Without Base",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:11:31.795Z",
  updatedAt: "2026-10-21T03:11:31.795Z",
} as const satisfies TemperMetric
