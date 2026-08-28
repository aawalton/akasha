import { Badge, IconBadge } from "@shared/design-badges/components/badge"
import { BadgeToggleGroup, type BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import { NumberBadge } from "@shared/design-badges/components/number-badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { PagesUILink as Link } from "@shared/pages-ui/router-context"
import {
  type CompanionBaseRoleId,
  companionBaseRoles,
  getBaseRoleName,
} from "@temper/game-companions-core/companion-base-roles-data"
import {
  type ComboRankingsMap,
  displayRoleComboKey,
  mapBaseRolesToDisplayRoles,
} from "@temper/game-companions-core/companion-leaderboard"
import type { CompanionState } from "@temper/game-companions-core/companion-types"
import type { CompanionId } from "@temper/game-companions-core/companions-data"
import {
  companionWeaponRoles,
  getWeaponRole,
} from "@temper/game-companions-core/equipment/companion-weapon-roles-data"
import { companionUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"
import { Search, Trophy } from "lucide-react"

interface CompanionPlanBuild {
  id: string
  name: string
  buildData: CompanionState | null
  updatedAt: number
  score: number
}

export interface CompanionPlanEntity {
  entityId: string
  companionId: CompanionId
  entityRoles: readonly CompanionBaseRoleId[]
  liveBuild: CompanionPlanBuild
  targetBuild: CompanionPlanBuild
  targetManuallyEdited: boolean
  sortOrder: number | null
  updatedAt: number
}

const TARGET_ROLE_ITEMS: BadgeToggleGroupItem[] = [
  { value: "dps", label: "DPS" },
  { value: "healer", label: "Healer" },
  { value: "support", label: "Support" },
  { value: "tank", label: "Tank" },
]

function BuildRow({ build, variant }: { build: CompanionPlanBuild; variant: "live" | "target" }) {
  const surface = useSurface()
  const weaponRoleId = build.buildData ? getWeaponRole(build.buildData) : null
  const weaponName =
    weaponRoleId != null && weaponRoleId !== "no-weapon-role"
      ? companionWeaponRoles.data[weaponRoleId].name
      : null

  return (
    <Link
      href={`${companionUrl(BuildId(build.id), build.name)}?tab=companion`}
      className={`flex cursor-pointer flex-col gap-1 rounded-lg ${surfaceClass(surface + 1)} px-3 py-2.5 transition-colors hover:bg-surface-3`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-primary text-sm">
          {build.name !== "" ? build.name : "Untitled Build"}
        </span>
        <Badge variant="elevation" className="shrink-0">
          {variant === "live" ? "Live" : "Target"}
        </Badge>
      </div>
      {(build.score > 0 || weaponName != null) && (
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          {weaponName != null && <Badge variant="elevation-muted">{weaponName}</Badge>}
          {build.score > 0 && (
            <Badge variant="accent" className="font-semibold">
              <span>Score</span>
              <span className="font-mono">{Math.round(build.score).toLocaleString()}</span>
            </Badge>
          )}
        </div>
      )}
    </Link>
  )
}

interface CompanionEntityPanelCardProps {
  entity: CompanionPlanEntity
  getCompanionName: (companionId: CompanionId) => string
  onUpdateEntityRoles?: (companionId: CompanionId, roles: readonly CompanionBaseRoleId[]) => void
  onRankClick?: (companionId: CompanionId, entityRoles: readonly CompanionBaseRoleId[]) => void
  onBrowseClick?: (companionId: CompanionId, roles: readonly CompanionBaseRoleId[]) => void
  onTrophyClick?: (
    entityId: string,
    sourceBuildId: string,
    companionName: string,
    targetManuallyEdited: boolean
  ) => void
  rankingsMap?: ComboRankingsMap
  overallRankMap?: Map<CompanionId, number>
  priorityIndex?: number
  totalEntities?: number
  onReorder?: (entityId: string, newIndex: number) => void
}

export function CompanionEntityPanelCard({
  entity,
  getCompanionName,
  onUpdateEntityRoles,
  onRankClick,
  onBrowseClick,
  onTrophyClick,
  rankingsMap,
  overallRankMap,
  priorityIndex,
  totalEntities,
  onReorder,
}: CompanionEntityPanelCardProps) {
  const buildData = entity.liveBuild.buildData ?? entity.targetBuild.buildData
  const roles: readonly CompanionBaseRoleId[] = (buildData?.companion?.baseRoles ??
    []) satisfies readonly CompanionBaseRoleId[]

  const companionName = getCompanionName(entity.companionId)

  const entityRoles = entity.entityRoles

  const selectedItems = entityRoles.map((id) => ({
    value: id,
    label: companionBaseRoles.data[id].name,
  }))

  const isOverallRank = entityRoles.length === 0
  const targetRank = (() => {
    if (isOverallRank) {
      return overallRankMap?.get(entity.companionId) ?? null
    }
    if (!rankingsMap) return null
    const displayRoles = mapBaseRolesToDisplayRoles(entityRoles)
    if (displayRoles.length === 0) return null
    const entries = rankingsMap.get(displayRoleComboKey(displayRoles))
    return entries?.find((e) => e.companionId === entity.companionId)?.rank ?? null
  })()

  const topBuildEntry = (() => {
    if (!rankingsMap) return null
    const lookupRoles = entityRoles.length > 0 ? entityRoles : roles
    if (lookupRoles.length === 0) return null
    const displayRoles = mapBaseRolesToDisplayRoles(lookupRoles)
    if (displayRoles.length === 0) return null
    return (
      rankingsMap
        .get(displayRoleComboKey(displayRoles))
        ?.find((e) => e.companionId === entity.companionId) ?? null
    )
  })()

  const handleEntityRolesSelect = (items: readonly BadgeToggleGroupItem[]) => {
    if (!onUpdateEntityRoles) return
    const newRoles: CompanionBaseRoleId[] = []
    for (const item of items) {
      if (companionBaseRoles.has(item.value)) newRoles.push(item.value)
    }
    onUpdateEntityRoles(entity.companionId, newRoles)
  }

  const priorityBadge =
    onReorder && priorityIndex !== undefined && totalEntities !== undefined ? (
      <NumberBadge
        editable
        value={priorityIndex}
        min={1}
        max={totalEntities}
        onChange={(val) => onReorder(entity.entityId, val - 1)}
        variant="elevation-muted"
        className="shrink-0"
      />
    ) : null

  return (
    <PanelCard id={`companion-entity-${entity.entityId}`} collapsible title={companionName}>
      <div className="flex flex-col gap-3">
        {(priorityBadge || roles.length > 0 || onUpdateEntityRoles) && (
          <div className="flex flex-col gap-2">
            {(priorityBadge || roles.length > 0) && (
              <div className="flex items-center gap-1.5">
                {priorityBadge}
                {roles.length > 0 && (
                  <Badge variant="elevation-muted">{getBaseRoleName(roles)}</Badge>
                )}
              </div>
            )}
            {onUpdateEntityRoles && (
              <div className="flex items-center gap-2">
                <BadgeToggleGroup
                  items={TARGET_ROLE_ITEMS}
                  value={selectedItems}
                  onSelect={handleEntityRolesSelect}
                  unselectedVariant="elevation-muted"
                  wrap
                />
                <div className="ml-auto flex shrink-0 items-center gap-1.5">
                  {targetRank !== null && (
                    <Badge
                      asChild
                      variant={targetRank <= 3 ? "accent" : "elevation-muted"}
                      className="cursor-pointer font-mono transition-colors hover:bg-surface-3"
                    >
                      <button
                        type="button"
                        onClick={() => onRankClick?.(entity.companionId, entityRoles)}
                      >
                        #{targetRank}
                      </button>
                    </Badge>
                  )}
                  {topBuildEntry && onTrophyClick && (
                    <IconBadge
                      asChild
                      variant="elevation"
                      className="cursor-pointer transition-colors hover:bg-surface-3"
                    >
                      <button
                        type="button"
                        title="Set as target build"
                        onClick={() =>
                          onTrophyClick(
                            entity.entityId,
                            topBuildEntry.buildId,
                            companionName,
                            entity.targetManuallyEdited
                          )
                        }
                      >
                        <Trophy />
                      </button>
                    </IconBadge>
                  )}
                  <IconBadge
                    asChild
                    variant="elevation"
                    className="cursor-pointer transition-colors hover:bg-surface-3"
                  >
                    <button
                      type="button"
                      title="Browse builds"
                      onClick={() => onBrowseClick?.(entity.companionId, entityRoles)}
                    >
                      <Search />
                    </button>
                  </IconBadge>
                </div>
              </div>
            )}
          </div>
        )}
        <BuildRow build={entity.liveBuild} variant="live" />
        <BuildRow build={entity.targetBuild} variant="target" />
      </div>
    </PanelCard>
  )
}
