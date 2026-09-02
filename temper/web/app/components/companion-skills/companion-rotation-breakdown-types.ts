import type { CompanionBaseRoleId } from "@akasha/temper-companions-core/companion-base-roles"
import type { CompanionFormulaStats } from "@temper/game-companions-core/formulas/companion-skill-formula"
import type { SkillUsageSummary } from "@temper/game-companions-core/rotation/rotation-types"
import type { RotationBreakdownRowId } from "@temper/game-companions-core/rotation-breakdown-row-data"
import type { CompanionSkillSlotId } from "@akasha/temper-companions-core/companion-skill-slots"
import type { CompanionSkillId } from "@akasha/temper-companions-core/companion-skills"
import type { CompanionMetricValue } from "@temper/game-companions-core/stats/companion-metrics.generated"
import type { CompanionMetricId } from "@akasha/temper-companions-core/companion-metric-ids"

export function getPrimaryRows(
  roles: readonly CompanionBaseRoleId[]
): ReadonlyArray<RotationBreakdownRowId> {
  const rows: RotationBreakdownRowId[] = []
  if (roles.includes("dps")) rows.push("dpc")
  if (roles.includes("healer")) rows.push("hpc")
  if (roles.includes("tank")) rows.push("tps")
  return rows
}

export interface SkillBreakdownTableProps {
  summaries: readonly SkillUsageSummary[]
  cycleDuration: number
  formulaStats: CompanionFormulaStats
  metricStats: Partial<Record<CompanionMetricId, CompanionMetricValue>>
  skillBar: Record<CompanionSkillSlotId, CompanionSkillId>
  primaryRows?: ReadonlyArray<RotationBreakdownRowId>
}
