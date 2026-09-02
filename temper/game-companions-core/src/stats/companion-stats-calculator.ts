import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import type { ReferenceBaseline } from "../optimizer/companion-support-types"
import { getReferenceBaseline } from "../optimizer/reference-build-data"
import {
  type CompanionStatsResult,
  calculateCompanionStatsWithBaseline,
} from "./companion-stats-calculator-impl"


export function calculateCompanionStats(
  build: CompanionState,
  baseline?: ReferenceBaseline
): CompanionStatsResult {
  const resolvedBaseline = baseline ?? getReferenceBaseline()
  return calculateCompanionStatsWithBaseline(build, resolvedBaseline)
}
