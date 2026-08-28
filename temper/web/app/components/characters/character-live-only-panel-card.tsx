import { Badge } from "@shared/design-badges/components/badge"
import { PanelCard } from "@shared/design-layout/components/panel-card"
import { Button } from "@shared/design-primitives/components/button"
import { CardContent, CardTitle } from "@shared/design-primitives/components/card"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { PagesUILink as Link } from "@shared/pages-ui/router-context"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { ClassId } from "@temper/game-characters-classes/classes-data"
import type { RaceId } from "@temper/game-characters-races/races"
import { characterUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"

interface LiveOnlyBuild {
  id: string
  name: string
  buildData: CharacterState | null
  updatedAt: number
}

export interface CharacterLiveOnlyEntity {
  entityId: string
  esoCharacterId: string
  liveBuild: LiveOnlyBuild
  sortOrder: number | null
}

function LiveBuildRow({
  build,
  getClassName,
  getRaceName,
}: {
  build: LiveOnlyBuild
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
          Live
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

interface CharacterLiveOnlyPanelCardProps {
  entity: CharacterLiveOnlyEntity
  getClassName: (classId: ClassId) => string
  getRaceName: (raceId: RaceId) => string
  onSetTarget: (entityId: string, esoCharacterId: string, liveBuildId: string) => void
}

export function CharacterLiveOnlyPanelCard({
  entity,
  getClassName,
  getRaceName,
  onSetTarget,
}: CharacterLiveOnlyPanelCardProps) {
  const liveBuildData = entity.liveBuild.buildData
  const characterName = liveBuildData?.character?.name
  const classId = liveBuildData?.character?.class
  const raceId = liveBuildData?.character?.race
  const className = classId != null && classId !== "no-class" ? getClassName(classId) : null
  const raceName = raceId != null && raceId !== "no-race" ? getRaceName(raceId) : null

  return (
    <PanelCard id={`character-entity-${entity.entityId}`} className="h-auto justify-between">
      <CardContent className="flex flex-col gap-3">
        <CardTitle className="text-lg">{characterName ?? "Unknown Character"}</CardTitle>
        {(className != null || raceName != null) && (
          <div className="flex items-center gap-1.5">
            {className != null && <Badge variant="elevation-muted">{className}</Badge>}
            {raceName != null && <Badge variant="elevation-muted">{raceName}</Badge>}
          </div>
        )}
        <LiveBuildRow
          build={entity.liveBuild}
          getClassName={getClassName}
          getRaceName={getRaceName}
        />
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => onSetTarget(entity.entityId, entity.esoCharacterId, entity.liveBuild.id)}
        >
          Set target build
        </Button>
      </CardContent>
    </PanelCard>
  )
}
