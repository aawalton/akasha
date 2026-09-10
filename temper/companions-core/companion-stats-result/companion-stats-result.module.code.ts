import type { CompanionEffectSource } from "../companion-effect-sources/companion-effect-sources.module.code.ts"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionMetricValue } from "../companion-metrics/companion-metrics.module.code.ts"
import type { RotationResult } from "../rotation-types/rotation-types.module.code.ts"

export interface CompanionStatsResult {
  sources: readonly CompanionEffectSource[]
  metrics: Partial<Record<CompanionMetricId, CompanionMetricValue>>
  rotation: RotationResult | null
}
