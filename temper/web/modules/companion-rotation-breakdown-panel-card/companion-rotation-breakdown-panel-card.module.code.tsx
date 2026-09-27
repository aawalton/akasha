"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { Skeleton } from "akasha/design/interface/primitive/modules/skeleton/skeleton.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import {
  type CompanionBaseRoleId,
  primaryBreakdownRowsOf,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionSkillId } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionMetricValue } from "akasha/temper/catalog/companion/companions-core/modules/companion-metrics/companion-metrics.module.code.ts"
import type { CompanionFormulaStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-formula/companion-skill-formula.module.code.ts"
import type { CompanionSkillSlotId } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-slots/companion-skill-slots.module.code.ts"
import type { RotationResult } from "akasha/temper/catalog/companion/companions-core/modules/rotation-types/rotation-types.module.code.ts"
import { SkillBreakdownTable } from "akasha/temper/web/modules/companion-rotation-breakdown-table/companion-rotation-breakdown-table.module.code.tsx"

import { deriveCompanionRotationOutcome } from "akasha/temper/web/modules/companion-rotation-outcome/companion-rotation-outcome.module.code.ts"
import { useCompanion } from "akasha/temper/web/modules/use-companion/use-companion.module.code.ts"
import { useCompanionStats } from "akasha/temper/web/modules/use-companion-stats/use-companion-stats.module.code.ts"
import {
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionRotationBreakdownPanelCardNoCompanion } from "akasha/temper/web/phrase/pages/companion-rotation-breakdown-panel-card-no-companion.temper-web-phrase.ts"
import { companionRotationBreakdownPanelCardNoDamageOrHealing } from "akasha/temper/web/phrase/pages/companion-rotation-breakdown-panel-card-no-damage-or-healing.temper-web-phrase.ts"
import { companionRotationBreakdownPanelCardNoSkills } from "akasha/temper/web/phrase/pages/companion-rotation-breakdown-panel-card-no-skills.temper-web-phrase.ts"
import { companionRotationBreakdownPanelCardNothingSimulated } from "akasha/temper/web/phrase/pages/companion-rotation-breakdown-panel-card-nothing-simulated.temper-web-phrase.ts"
import { companionRotationBreakdownPanelCardTitle } from "akasha/temper/web/phrase/pages/companion-rotation-breakdown-panel-card-title.temper-web-phrase.ts"
import { companionRotationBreakdownPanelCardUnable } from "akasha/temper/web/phrase/pages/companion-rotation-breakdown-panel-card-unable.temper-web-phrase.ts"

interface CompanionRotationBreakdownPanelCardProps {
  className?: string
}

export function CompanionRotationBreakdownPanelCard({
  className,
}: CompanionRotationBreakdownPanelCardProps) {
  const build = useCompanion()
  const phrase = usePhrase()
  const { rotation, isLoading, formulaStats, stats } = useCompanionStats()

  const hasCompanion = build.companion.id !== "no-companion"
  const hasSkills = Object.values(build.skills["skill-bar"]).some((id) => id !== "no-skill")

  return (
    <PanelCard
      id="companion-rotation"
      collapsible={true}
      title={phrase(companionRotationBreakdownPanelCardTitle.slug)}
      className={className}
    >
      {!hasCompanion ? (
        <Text>{phrase(companionRotationBreakdownPanelCardNoCompanion.slug)}</Text>
      ) : !hasSkills ? (
        <Text>{phrase(companionRotationBreakdownPanelCardNoSkills.slug)}</Text>
      ) : isLoading ? (
        <RotationLoading />
      ) : !rotation ? (
        <Text>{phrase(companionRotationBreakdownPanelCardUnable.slug)}</Text>
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
  const describe = usePhraseDescription()
  const outcome = deriveCompanionRotationOutcome(rotation)

  switch (outcome) {
    case "nothing-simulated":
      return <Text>{describe(companionRotationBreakdownPanelCardNothingSimulated.slug)}</Text>
    case "no-damage-or-healing":
      return <Text>{describe(companionRotationBreakdownPanelCardNoDamageOrHealing.slug)}</Text>
    case "breakdown":
      return (
        <SkillBreakdownTable
          summaries={rotation.skillSummaries}
          cycleDuration={rotation.config.cycleDuration}
          formulaStats={formulaStats}
          metricStats={metricStats}
          skillBar={skillBar}
          primaryRows={primaryBreakdownRowsOf(roles)}
        />
      )
    default:
      return assertNever(outcome)
  }
}
