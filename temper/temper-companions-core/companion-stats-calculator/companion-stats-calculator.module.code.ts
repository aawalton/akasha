import { calculateCompanionStatsWithBaseline } from "../companion-stats-calculator-impl/companion-stats-calculator-impl.module.code.ts"
import type { CompanionStatsResult } from "../companion-stats-result/companion-stats-result.module.code.ts"
import type { ReferenceBaseline } from "../companion-support-types/companion-support-types.module.code.ts"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import { getReferenceBaseline } from "../reference-build-data/reference-build-data.module.code.ts"

export function calculateCompanionStats(
  build: CompanionState,
  baseline?: ReferenceBaseline
): CompanionStatsResult {
  const resolvedBaseline = baseline ?? getReferenceBaseline()
  return calculateCompanionStatsWithBaseline(build, resolvedBaseline)
}
