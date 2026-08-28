"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Skeleton } from "@shared/design-primitives/components/skeleton"
import { Text } from "@shared/design-primitives/components/text"
import { assertNever } from "@shared/utils-narrow/assert-never"
import type { CompanionBaseRoleId } from "@temper/game-companions-core/companion-base-roles-data"
import type { CompanionFormulaStats } from "@temper/game-companions-core/formulas/companion-skill-formula"
import type { RotationResult } from "@temper/game-companions-core/rotation/rotation-types"
import type { CompanionSkillSlotId } from "@temper/game-companions-core/skills/companion-skill-slots-data"
import type { CompanionSkillId } from "@temper/game-companions-core/skills/companion-skills-data"
import type { CompanionMetricValue } from "@temper/game-companions-core/stats/companion-metrics.generated"
import type { CompanionMetricId } from "@temper/game-companions-core/stats/companion-metric-ids.generated"
import { SkillBreakdownTable } from "@/components/companion-skills/companion-rotation-breakdown-table"
import { getPrimaryRows } from "@/components/companion-skills/companion-rotation-breakdown-types"
import { deriveCompanionRotationOutcome } from "@/components/companion-skills/companion-rotation-outcome"
import { useCompanion } from "@/components/companions/context/use-companion"
import { useCompanionStats } from "@/components/companions/context/use-companion-stats"

interface CompanionRotationBreakdownPanelCardProps {
  className?: string
}

export function CompanionRotationBreakdownPanelCard({
  className,
}: CompanionRotationBreakdownPanelCardProps) {
  const build = useCompanion()
  const { rotation, isLoading, formulaStats, stats } = useCompanionStats()

  const hasCompanion = build.companion.id !== "no-companion"
  const hasSkills = Object.values(build.skills["skill-bar"]).some((id) => id !== "no-skill")

  return (
    <PanelCard id="companion-rotation" collapsible={true} title="Rotation" className={className}>
      {!hasCompanion ? (
        <Text>Select a companion to see rotation info.</Text>
      ) : !hasSkills ? (
        <Text>Slot skills to see rotation simulation.</Text>
      ) : isLoading ? (
        <RotationLoading />
      ) : !rotation ? (
        <Text>Unable to simulate rotation.</Text>
      ) : (
        <RotationContent
          rotation={rotation}
          formulaStats={formulaStats}
          metricStats={stats}
          skillBar={build.skills["skill-bar"]}
          roles={build.companion.baseRoles}
        />
      )}
    </PanelCard>
  )
}

function RotationLoading() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  )
}

interface RotationContentProps {
  rotation: RotationResult
  formulaStats: CompanionFormulaStats
  metricStats: Partial<Record<CompanionMetricId, CompanionMetricValue>>
  skillBar: Record<CompanionSkillSlotId, CompanionSkillId>
  roles: readonly CompanionBaseRoleId[]
}

function RotationContent({
  rotation,
  formulaStats,
  metricStats,
  skillBar,
  roles,
}: RotationContentProps) {
  const outcome = deriveCompanionRotationOutcome(rotation)

  switch (outcome) {
    case "nothing-simulated":
      return (
        <Text>
          None of the slotted skills are ones the rotation simulation runs. It skips passive skills
          and any skill it has no data for, and every slot on the bar fell into one of those. If
          these are normal active skills, the gap is in Temper's skill data, not in your setup.
        </Text>
      )
    case "no-damage-or-healing":
      return (
        <Text>
          The simulation ran your slotted skills and came back with no damage and no healing. A bar
          of pure buff, debuff, or taunt skills produces exactly that. If a skill here should be
          dealing damage or healing, the simulation is not reading it, and that is Temper's to fix.
        </Text>
      )
    case "breakdown":
      return (
        <SkillBreakdownTable
          summaries={rotation.skillSummaries}
          cycleDuration={rotation.config.cycleDuration}
          formulaStats={formulaStats}
          metricStats={metricStats}
          skillBar={skillBar}
          primaryRows={getPrimaryRows(roles)}
        />
      )
    default:
      return assertNever(outcome)
  }
}
