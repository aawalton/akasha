import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const mountStaminaRegenMoving = {
  id: "01a0de67-c00b-7faf-b0a5-edffad480e90",
  type: "page-type/temper-metric",
  slug: "mount-stamina-regen-moving",
  title: "Mount Stamina Regen (Moving)",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_MOUNT_STAMINA_REGEN_MOVING",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
