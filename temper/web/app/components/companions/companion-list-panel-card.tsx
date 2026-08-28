import { Badge, BadgeRow } from "@shared/design-badges/components/badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardContent, CardHeader, CardTitle, CardTitleBadges } from "@shared/design-primitives/components/card"
import { Text } from "@shared/design-primitives/components/text"
import { PagesUILink as Link } from "@shared/pages-ui/router-context"
import {
  type CompanionBaseRoleId,
  getBaseRoleName,
} from "@temper/game-companions-core/companion-base-roles-data"
import type { CompanionState } from "@temper/game-companions-core/companion-types"
import type { CompanionId } from "@temper/game-companions-core/companions-data"
import {
  companionWeaponRoles,
  getWeaponRole,
} from "@temper/game-companions-core/equipment/companion-weapon-roles-data"
import { calculateCompanionStats } from "@temper/game-companions-core/stats/companion-stats-calculator"
import { type CompanionStatsResult } from "@temper/game-companions-core/stats/companion-stats-calculator-impl"
import { companionUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"

function getRolePrimaryStats(roles: readonly CompanionBaseRoleId[]): ReadonlySet<string> {
  const stats = new Set<string>()
  if (roles.includes("dps")) stats.add("Damage")
  if (roles.includes("healer")) stats.add("Healing")
  if (roles.includes("support")) stats.add("Support")
  if (roles.includes("tank")) stats.add("Toughness")
  return stats
}

interface CompanionListPanelCardBuild {
  id: string
  name: string
  description: string
  buildData: CompanionState | null
  createdAt: number
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
  const buildData = build.buildData

  const stats =
    precomputedStats !== undefined
      ? precomputedStats
      : buildData
        ? calculateCompanionStats(buildData)
        : null

  const roles = buildData?.companion?.baseRoles ?? []
  const weaponRoleId = buildData ? getWeaponRole(buildData) : "no-weapon-role"

  const allStats = [
    { name: "Damage", metricId: "companion-dps-total" as const },
    { name: "Healing", metricId: "companion-hps-total" as const },
    { name: "Support", metricId: "companion-support-score" as const },
    { name: "Toughness", metricId: "companion-tps-total" as const },
  ]

  const primaryNames = getRolePrimaryStats(roles)
  const relevantStats = allStats.filter((s) => primaryNames.has(s.name))

  return (
    <Link
      href={`${companionUrl(BuildId(build.id), build.name)}?tab=companion`}
      className="block w-full min-[520px]:w-auto"
    >
      <PanelCard
        id={`companion-${build.id}`}
        key={build.id}
        className="group h-[232px] cursor-pointer justify-between transition-colors"
      >
        <CardHeader className="flex-col items-stretch pb-3">
          <CardTitle className="text-lg">
            {build.name !== "" ? build.name : "Untitled Build"}
            <CardTitleBadges>
              {!isOwnBuild && userHandle != null && <Badge variant="accent">{userHandle}</Badge>}
              {isOwnBuild && <Badge variant="accent">My Build</Badge>}
              {isTarget && <Badge variant="elevation-muted">Target</Badge>}
            </CardTitleBadges>
          </CardTitle>
          <BadgeRow>
            {buildData?.companion?.id != null && buildData.companion.id !== "no-companion" && (
              <Badge variant="elevation-muted">{getCompanionName(buildData.companion.id)}</Badge>
            )}
            {roles.length > 0 && <Badge variant="elevation-muted">{getBaseRoleName(roles)}</Badge>}
            {weaponRoleId !== "no-weapon-role" && (
              <Badge variant="elevation-muted">
                {companionWeaponRoles.data[weaponRoleId].name}
              </Badge>
            )}
          </BadgeRow>
          <BadgeRow>
            <Badge variant="accent" className="font-semibold">
              <span>Score</span>
              <span className="font-mono">{Math.round(build.score).toLocaleString()}</span>
            </Badge>
            {relevantStats.map((metric) => {
              const value = stats?.metrics[metric.metricId]?.value ?? 0
              return (
                <Badge key={metric.metricId} variant="elevation-muted">
                  <span className="text-secondary">{metric.name}</span>
                  <span className="font-mono">{value.toLocaleString()}</span>
                </Badge>
              )
            })}
          </BadgeRow>
        </CardHeader>
        <CardContent className="space-y-4">
          {build.description !== "" && <Text className="line-clamp-2">{build.description}</Text>}
          <Text variant="caption" as="div">
            {build.createdAt === build.updatedAt ? "Created" : "Updated"}{" "}
            {new Date(build.updatedAt).toLocaleDateString()}
          </Text>
        </CardContent>
      </PanelCard>
    </Link>
  )
}
