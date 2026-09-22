import type { CompanionBaseRoleId } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionSkillId } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionMetricValue } from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import type { CompanionFormulaStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-formula/companion-skill-formula.module.code.ts"
import type { CompanionSkillSlotId } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-slots/companion-skill-slots.module.code.ts"
import type { RotationBreakdownRowId } from "akasha/temper/catalog/companion/companions-core/modules/rotation-breakdown-rows/rotation-breakdown-rows.module.code.ts"
import type { SkillUsageSummary } from "akasha/temper/catalog/companion/companions-core/modules/rotation-types/rotation-types.module.code.ts"

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
