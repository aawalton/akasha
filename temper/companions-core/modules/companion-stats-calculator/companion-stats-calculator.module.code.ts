import type { CompanionStatsResult } from "akasha/temper/companions-core/companion-stats-result/companion-stats-result.module.code.ts"
import type { ReferenceBaseline } from "akasha/temper/companions-core/companion-support-types/companion-support-types.module.code.ts"
import type { CompanionState } from "akasha/temper/companions-core/companion-types/companion-types.module.code.ts"
import { calculateCompanionStatsWithBaseline } from "akasha/temper/companions-core/modules/companion-stats-calculator-impl/companion-stats-calculator-impl.module.code.ts"
import { getReferenceBaseline } from "akasha/temper/companions-core/reference-build-data/reference-build-data.module.code.ts"

export function calculateCompanionStats(
  build: CompanionState,
  baseline?: ReferenceBaseline
): CompanionStatsResult {
  const resolvedBaseline = baseline ?? getReferenceBaseline()
  return calculateCompanionStatsWithBaseline(build, resolvedBaseline)
}
