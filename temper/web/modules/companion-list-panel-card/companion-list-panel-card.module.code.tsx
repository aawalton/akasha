import { Badge, BadgeRow } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardTitleBadges,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { PagesUILink as Link } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import {
  type CompanionBaseRoleId,
  getBaseRoleName,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import { calculateCompanionStats } from "akasha/temper/catalog/companion/companions-core/modules/companion-stats-calculator/companion-stats-calculator.module.code.ts"
import type { CompanionStatsResult } from "akasha/temper/catalog/companion/companions-core/modules/companion-stats-result/companion-stats-result.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import { getWeaponRole } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-role-match/companion-weapon-role-match.module.code.ts"
import { companionWeaponRoleAt } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-roles/companion-weapon-roles.module.code.ts"
import type { CompanionId } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { companionUrl } from "akasha/temper/player/character/build/build-support/modules/build-url/build-url.module.code.ts"
import { buildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { buildDateLine } from "akasha/temper/web/modules/build-date-line/build-date-line.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionListPanelCardDamage } from "akasha/temper/web/phrase/pages/companion-list-panel-card-damage.temper-web-phrase.ts"
import { companionListPanelCardHealing } from "akasha/temper/web/phrase/pages/companion-list-panel-card-healing.temper-web-phrase.ts"
import { companionListPanelCardMyBuild } from "akasha/temper/web/phrase/pages/companion-list-panel-card-my-build.temper-web-phrase.ts"
import { companionListPanelCardScore } from "akasha/temper/web/phrase/pages/companion-list-panel-card-score.temper-web-phrase.ts"
import { companionListPanelCardSupport } from "akasha/temper/web/phrase/pages/companion-list-panel-card-support.temper-web-phrase.ts"
import { companionListPanelCardTarget } from "akasha/temper/web/phrase/pages/companion-list-panel-card-target.temper-web-phrase.ts"
import { companionListPanelCardToughness } from "akasha/temper/web/phrase/pages/companion-list-panel-card-toughness.temper-web-phrase.ts"
import { companionListPanelCardUntitledBuild } from "akasha/temper/web/phrase/pages/companion-list-panel-card-untitled-build.temper-web-phrase.ts"

const ROLE_STATS = [
  { role: "dps", metricId: "companion-dps-total", label: companionListPanelCardDamage },
  { role: "healer", metricId: "companion-hps-total", label: companionListPanelCardHealing },
  { role: "support", metricId: "companion-support-score", label: companionListPanelCardSupport },
  { role: "tank", metricId: "companion-tps-total", label: companionListPanelCardToughness },
] as const satisfies readonly { role: CompanionBaseRoleId; metricId: string; label: unknown }[]

interface CompanionListPanelCardBuild {
  id: string
  name: string
  description: string
  buildData: CompanionState | null
  createdAt: number | null
  updatedAt: number
  score: number
  userId: string
}

interface CompanionListPanelCardProps {
  build: CompanionListPanelCardBuild
  getCompanionName: (companionId: CompanionId) => string
  isOwnBuild: boolean
  isTarget: boolean
  userHandle: string | null
  precomputedStats?: CompanionStatsResult | null
}

export function CompanionListPanelCard({
  build,
  getCompanionName,
  isOwnBuild,
  isTarget,
  userHandle,
  precomputedStats,
}: CompanionListPanelCardProps) {
  const phrase = usePhrase()
  const buildData = build.buildData

  const stats =
    precomputedStats !== undefined
      ? precomputedStats
      : buildData
        ? calculateCompanionStats(buildData)
        : null

  const roles = buildData?.companion?.baseRoles ?? []
  const weaponRoleId = buildData ? getWeaponRole(buildData) : "no-weapon-role"

  const relevantStats = ROLE_STATS.filter((s) => roles.includes(s.role))

  return (
    <Link
      href={`${companionUrl(buildId(build.id), build.name)}?tab=companion`}
      className="block w-full min-[520px]:w-auto"
    >
      <PanelCard
        id={`companion-${build.id}`}
        key={build.id}
        className="group h-[232px] cursor-pointer justify-between transition-colors"
      >
        <CardHeader className="flex-col items-stretch pb-3">
          <CardTitle className="text-lg">
            {build.name !== "" ? build.name : phrase(companionListPanelCardUntitledBuild.slug)}
            <CardTitleBadges>
              {!isOwnBuild && userHandle != null && <Badge variant="accent">{userHandle}</Badge>}
              {isOwnBuild && (
                <Badge variant="accent">{phrase(companionListPanelCardMyBuild.slug)}</Badge>
              )}
              {isTarget && (
                <Badge variant="elevation-muted">{phrase(companionListPanelCardTarget.slug)}</Badge>
              )}
            </CardTitleBadges>
          </CardTitle>
          <BadgeRow>
            {buildData?.companion?.id != null && buildData.companion.id !== "no-companion" && (
              <Badge variant="elevation-muted">{getCompanionName(buildData.companion.id)}</Badge>
            )}
            {roles.length > 0 && <Badge variant="elevation-muted">{getBaseRoleName(roles)}</Badge>}
            {weaponRoleId !== "no-weapon-role" && (
              <Badge variant="elevation-muted">{companionWeaponRoleAt(weaponRoleId).name}</Badge>
            )}
          </BadgeRow>
          <BadgeRow>
            <Badge variant="accent" className="font-semibold">
              <span>{phrase(companionListPanelCardScore.slug)}</span>
              <span className="font-mono">{Math.round(build.score).toLocaleString()}</span>
            </Badge>
            {relevantStats.map((metric) => {
              const value = stats?.metrics[metric.metricId]?.value ?? 0
              return (
                <Badge key={metric.metricId} variant="elevation-muted">
                  <span className="text-secondary">{phrase(metric.label.slug)}</span>
                  <span className="font-mono">{value.toLocaleString()}</span>
                </Badge>
              )
            })}
          </BadgeRow>
        </CardHeader>
        <CardContent className="space-y-4">
          {build.description !== "" && <Text className="line-clamp-2">{build.description}</Text>}
          <Text variant="caption" as="div">
            {buildDateLine(build)}
          </Text>
        </CardContent>
      </PanelCard>
    </Link>
  )
}
