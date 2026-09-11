import type { CompanionEffectSource } from "akasha/temper/companions-core/companion-effect-sources/companion-effect-sources.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/companions-core/companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionMetricValue } from "akasha/temper/companions-core/companion-metrics/companion-metrics.module.code.ts"
import type { RotationResult } from "akasha/temper/companions-core/rotation-types/rotation-types.module.code.ts"

export interface CompanionStatsResult {
  sources: readonly CompanionEffectSource[]
  metrics: Partial<Record<CompanionMetricId, CompanionMetricValue>>
  rotation: RotationResult | null
}
