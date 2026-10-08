import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionTooltipWeaponHealing = {
  id: "01a0df07-1cd5-75e4-a6de-e32d80e379ad",
  type: "page-type/temper-metric",
  slug: "companion-tooltip-weapon-healing",
  title: "Tooltip Weapon Healing",
  subject: "companion",
  valueType: "integer",
  formula: "ts",
  createdAt: "2026-09-26T18:43:00.437Z",
  updatedAt: "2026-09-26T18:43:39.000Z",
} as const satisfies TemperMetric
