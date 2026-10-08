import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const mountStaminaRegenCombat = {
  id: "01a0de67-c00b-77d8-8e93-08b0e6bc27f0",
  type: "page-type/temper-metric",
  slug: "mount-stamina-regen-combat",
  title: "Mount Stamina Regen (Combat)",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_MOUNT_STAMINA_REGEN_COMBAT",
  fullyImplemented: true,
  formula: "ts",
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
