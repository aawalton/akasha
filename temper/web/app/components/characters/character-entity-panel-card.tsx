import { Badge } from "@shared/design-badges/components/badge"
import { BadgeToggleGroup, type BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import { NumberBadge } from "@shared/design-badges/components/number-badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardContent, CardTitle } from "@shared/design-primitives/components/card"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { PagesUILink as Link } from "@shared/pages-ui/router-context"
import { roles } from "@temper/game-characters-character/generated/temper-character-role.generated"
import { type RoleId } from "@temper/game-characters-character/roles"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { ClassId } from "@temper/game-characters-classes/classes-data"
import type { RaceId } from "@temper/game-characters-races/races"
import { characterUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"

interface CharacterPlanBuild {
  id: string
  name: string
  buildData: CharacterState | null
  updatedAt: number
}

export interface CharacterPlanEntity {
  entityId: string
  esoCharacterId: string
  entityRoles: readonly RoleId[]
  liveBuild: CharacterPlanBuild
  targetBuild: CharacterPlanBuild
  sortOrder: number | null
  updatedAt: number
}

const TARGET_ROLE_ITEMS: BadgeToggleGroupItem[] = roles.list
  .filter((role) => role.id !== "no-role")
  .map((role) => ({
    value: role.id,
    label: role.name,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

function BuildRow({
  build,
  variant,
  getClassName,
  getRaceName,
}: {
  build: CharacterPlanBuild
  variant: "live" | "target"
  getClassName: (classId: ClassId) => string
  getRaceName: (raceId: RaceId) => string
}) {
  const surface = useSurface()
  const classId = build.buildData?.character?.class
  const raceId = build.buildData?.character?.race
  const className = classId != null && classId !== "no-class" ? getClassName(classId) : null
  const raceName = raceId != null && raceId !== "no-race" ? getRaceName(raceId) : null

  return (
    <Link
      href={`${characterUrl(BuildId(build.id), build.name)}?tab=character`}
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
      {(className != null || raceName != null) && (
        <div className="flex flex-wrap items-center gap-1.5">
          {className != null && <Badge variant="elevation-muted">{className}</Badge>}
          {raceName != null && <Badge variant="elevation-muted">{raceName}</Badge>}
        </div>
      )}
    </Link>
  )
}

interface CharacterEntityPanelCardProps {
  entity: CharacterPlanEntity
  getClassName: (classId: ClassId) => string
  getRaceName: (raceId: RaceId) => string
  onUpdateEntityRoles?: (esoCharacterId: string, roles: readonly RoleId[]) => void
  priorityIndex: number
  totalEntities: number
  onReorder?: (entityId: string, newIndex: number) => void
}

export function CharacterEntityPanelCard({
  entity,
  getClassName,
  getRaceName,
  onUpdateEntityRoles,
  priorityIndex,
  totalEntities,
  onReorder,
}: CharacterEntityPanelCardProps) {
  const liveBuildData = entity.liveBuild.buildData

  const characterName =
    liveBuildData?.character?.name ?? entity.targetBuild.buildData?.character?.name

  const classId = liveBuildData?.character?.class
  const raceId = liveBuildData?.character?.race
  const className = classId != null && classId !== "no-class" ? getClassName(classId) : null
  const raceName = raceId != null && raceId !== "no-race" ? getRaceName(raceId) : null

  const entityRoles = entity.entityRoles

  const selectedItems = entityRoles
    .filter((id) => id !== "no-role" && roles.has(id))
    .map((id) => ({
      value: id,
      label: roles.data[id].name,
    }))

  const handleEntityRolesSelect = (items: readonly BadgeToggleGroupItem[]) => {
    if (!onUpdateEntityRoles) return
    const newRoles = items.map((item) => item.value).filter((v): v is RoleId => roles.has(v))
    onUpdateEntityRoles(entity.esoCharacterId, newRoles)
  }

  return (
    <PanelCard id={`character-entity-${entity.entityId}`} className="h-auto justify-between">
      <CardContent className="flex flex-col gap-3">
        <CardTitle className="text-lg">{characterName ?? "Unknown Character"}</CardTitle>
        {(onReorder != null ||
          className != null ||
          raceName != null ||
          onUpdateEntityRoles != null) && (
          <div className="flex flex-col gap-2">
            {(onReorder != null || className != null || raceName != null) && (
              <div className="flex items-center gap-1.5">
                {onReorder != null && (
                  <NumberBadge
                    editable
                    value={priorityIndex}
                    min={1}
                    max={totalEntities}
                    onChange={(val) => onReorder(entity.entityId, val - 1)}
                    variant="elevation-muted"
                    className="shrink-0"
                  />
                )}
                {className != null && <Badge variant="elevation-muted">{className}</Badge>}
                {raceName != null && <Badge variant="elevation-muted">{raceName}</Badge>}
              </div>
            )}
            {onUpdateEntityRoles != null && (
              <BadgeToggleGroup
                items={TARGET_ROLE_ITEMS}
                value={selectedItems}
                onSelect={handleEntityRolesSelect}
                unselectedVariant="elevation-muted"
                wrap
              />
            )}
          </div>
        )}
        <BuildRow
          build={entity.liveBuild}
          variant="live"
          getClassName={getClassName}
          getRaceName={getRaceName}
        />
        <BuildRow
          build={entity.targetBuild}
          variant="target"
          getClassName={getClassName}
          getRaceName={getRaceName}
        />
      </CardContent>
    </PanelCard>
  )
}
