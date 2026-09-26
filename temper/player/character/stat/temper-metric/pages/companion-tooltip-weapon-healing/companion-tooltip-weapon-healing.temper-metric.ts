import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const companionTooltipWeaponHealing = {
  id: "01a0df07-1cd5-75e4-a6de-e32d80e379ad",
  type: "page-type/temper-metric",
  slug: "companion-tooltip-weapon-healing",
  title: "Tooltip Weapon Healing",
  subject: "companion",
  valueType: "integer",
  formula: "ts",
} as const satisfies TemperMetric
