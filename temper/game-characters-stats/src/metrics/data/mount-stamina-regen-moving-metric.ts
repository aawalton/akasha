import type { MetricTemplate } from "../metric-template"

export const mountStaminaRegenMovingMetric = {
  id: "mount-stamina-regen-moving",

  name: "Mount Stamina Regen (Moving)",
  category: "base",
  esoStatConstantName: "STAT_MOUNT_STAMINA_REGEN_MOVING",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "integer",
  },
} satisfies MetricTemplate
