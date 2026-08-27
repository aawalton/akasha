import type { MetricTemplate } from "../metric-template"

export const mountStaminaRegenCombatMetric = {
  id: "mount-stamina-regen-combat",

  name: "Mount Stamina Regen (Combat)",
  category: "base",
  esoStatConstantName: "STAT_MOUNT_STAMINA_REGEN_COMBAT",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: {
    type: "sum",
    effectType: "integer",
  },
} satisfies MetricTemplate
