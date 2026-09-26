import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const magicalAbilityStatusChance = {
  id: "01a0de67-c00b-7096-aa41-1edf0f06dac8",
  type: "page-type/temper-metric",
  slug: "magical-ability-status-chance",
  title: "Magical Status Chance (Ability)",
  valueType: "fractional-change",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
