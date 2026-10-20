import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  CardContent,
  CardTitle,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { PagesUILink as Link } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import type { RaceId } from "akasha/temper/catalog/character-race/modules/races/races.module.code.ts"
import { characterUrl } from "akasha/temper/player/character/build/build-support/modules/build-url/build-url.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { buildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { characterLiveOnlyPanelCardLive } from "akasha/temper/web/phrase/pages/character-live-only-panel-card-live.temper-web-phrase.ts"
import { characterLiveOnlyPanelCardSetTargetBuild } from "akasha/temper/web/phrase/pages/character-live-only-panel-card-set-target-build.temper-web-phrase.ts"
import { characterLiveOnlyPanelCardTarget } from "akasha/temper/web/phrase/pages/character-live-only-panel-card-target.temper-web-phrase.ts"
import { characterLiveOnlyPanelCardUnknownCharacter } from "akasha/temper/web/phrase/pages/character-live-only-panel-card-unknown-character.temper-web-phrase.ts"
import { characterLiveOnlyPanelCardUntitledBuild } from "akasha/temper/web/phrase/pages/character-live-only-panel-card-untitled-build.temper-web-phrase.ts"

interface OneBuild {
  id: string
  name: string
  buildData: CharacterState | null
  updatedAt: number
}

type AttachedVisibility = "live" | "target"

export interface CharacterLiveOnlyEntity {
  entityId: string
  esoCharacterId: string
  build: OneBuild
  visibility: AttachedVisibility
  sortOrder: number | null
}

const VISIBILITY_PHRASE = {
  live: characterLiveOnlyPanelCardLive,
  target: characterLiveOnlyPanelCardTarget,
} as const

function OneBuildRow({
  build,
  visibility,
  getClassName,
  getRaceName,
}: {
  build: OneBuild
  visibility: AttachedVisibility
  getClassName: (classId: ClassId) => string
  getRaceName: (raceId: RaceId) => string
}) {
  const surface = useSurface()
  const phrase = usePhrase()
  const classId = build.buildData?.character?.class
  const raceId = build.buildData?.character?.race
  const className = classId != null && classId !== "no-class" ? getClassName(classId) : null
  const raceName = raceId != null && raceId !== "no-race" ? getRaceName(raceId) : null

  return (
    <Link
      href={`${characterUrl(buildId(build.id), build.name)}?tab=character`}
      className={`flex cursor-pointer flex-col gap-1 rounded-lg ${surfaceClass(surface + 1)} px-3 py-2.5 transition-colors hover:bg-surface-3`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-primary text-sm">
          {build.name !== "" ? build.name : phrase(characterLiveOnlyPanelCardUntitledBuild.slug)}
        </span>
        <Badge variant="elevation" className="shrink-0">
          {phrase(VISIBILITY_PHRASE[visibility].slug)}
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
  const phrase = usePhrase()
  const buildData = entity.build.buildData
  const characterName = buildData?.character?.name
  const classId = buildData?.character?.class
  const raceId = buildData?.character?.race
  const className = classId != null && classId !== "no-class" ? getClassName(classId) : null
  const raceName = raceId != null && raceId !== "no-race" ? getRaceName(raceId) : null

  return (
    <PanelCard id={`character-entity-${entity.entityId}`} className="h-auto justify-between">
      <CardContent className="flex flex-col gap-3">
        <CardTitle className="text-lg">
          {characterName ?? phrase(characterLiveOnlyPanelCardUnknownCharacter.slug)}
        </CardTitle>
        {(className != null || raceName != null) && (
          <div className="flex items-center gap-1.5">
            {className != null && <Badge variant="elevation-muted">{className}</Badge>}
            {raceName != null && <Badge variant="elevation-muted">{raceName}</Badge>}
          </div>
        )}
        <OneBuildRow
          build={entity.build}
          visibility={entity.visibility}
          getClassName={getClassName}
          getRaceName={getRaceName}
        />
        {entity.visibility === "live" && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => onSetTarget(entity.entityId, entity.esoCharacterId, entity.build.id)}
          >
            {phrase(characterLiveOnlyPanelCardSetTargetBuild.slug)}
          </Button>
        )}
      </CardContent>
    </PanelCard>
  )
}
