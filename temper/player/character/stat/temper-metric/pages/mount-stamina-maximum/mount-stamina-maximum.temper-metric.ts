import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const mountStaminaMaximum = {
  id: "01a0de67-c00b-7595-8871-d62538d999bd",
  type: "page-type/temper-metric",
  slug: "mount-stamina-maximum",
  title: "Mount Stamina Maximum",
  category: "base",
  valueType: "integer",
  polarity: "higher-is-better",
  esoStatConstantName: "STAT_MOUNT_STAMINA_MAX",
  fullyImplemented: false,
  createdAt: "2026-09-26T15:48:56.459Z",
  updatedAt: "2026-09-26T15:49:21.000Z",
} as const satisfies TemperMetric
