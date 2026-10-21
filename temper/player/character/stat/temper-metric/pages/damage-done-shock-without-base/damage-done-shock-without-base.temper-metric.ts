import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const damageDoneShockWithoutBase = {
  id: "01a15c71-4dd5-7ac0-aa01-5a06ac0d92ec",
  type: "page-type/temper-metric",
  slug: "damage-done-shock-without-base",
  title: "Damage Done (Shock) Without Base",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-10-21T03:11:31.795Z",
  updatedAt: "2026-10-21T03:11:31.795Z",
} as const satisfies TemperMetric
