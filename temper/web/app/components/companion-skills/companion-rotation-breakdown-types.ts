import type { CompanionBaseRoleId } from "@temper/game-companions-core/companion-base-roles-data"
import type { CompanionFormulaStats } from "@temper/game-companions-core/formulas/companion-skill-formula"
import type { SkillUsageSummary } from "@temper/game-companions-core/rotation/rotation-types"
import type { RotationBreakdownRowId } from "@temper/game-companions-core/rotation-breakdown-row-data"
import type { CompanionSkillSlotId } from "@temper/game-companions-core/skills/companion-skill-slots-data"
import type { CompanionSkillId } from "@temper/game-companions-core/skills/companion-skills-data"
import type { CompanionMetricValue } from "@temper/game-companions-core/stats/companion-metrics.generated"
import type { CompanionMetricId } from "@temper/game-companions-core/stats/companion-metric-ids.generated"

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
