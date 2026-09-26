import type { TemperMetric } from "akasha/temper/player/character/stat/temper-metric/temper-metric.page-type.types.ts"

export const haRestoreWerewolf = {
  id: "01a0de67-c00a-7c6c-a0bc-321d0ab85b05",
  type: "page-type/temper-metric",
  slug: "ha-restore-werewolf",
  title: "HA Restore (Werewolf)",
  valueType: "integer",
  polarity: "higher-is-better",
  fullyImplemented: true,
  formula: "ts",
} as const satisfies TemperMetric
