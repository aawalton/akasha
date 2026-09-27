"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { CardDescription } from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { PagesUILink as Link } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import {
  type RaceId,
  races,
} from "akasha/temper/catalog/character-race/modules/races/races.module.code.ts"
import { classes } from "akasha/temper/modules/character-class/character-class.module.code.ts"
import { characterUrl } from "akasha/temper/player/character/build/build-support/modules/build-url/build-url.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { buildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import { getRoleName } from "akasha/temper/player/character/source/modules/character-roles/character-roles.module.code.ts"
import { buildDateLine } from "akasha/temper/web/modules/build-date-line/build-date-line.module.code.ts"
import { NewCharacterButton } from "akasha/temper/web/modules/new-character-button/new-character-button.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { recentCharactersCardGetStarted } from "akasha/temper/web/phrase/pages/recent-characters-card-get-started.temper-web-phrase.ts"
import { recentCharactersCardHeading } from "akasha/temper/web/phrase/pages/recent-characters-card-heading.temper-web-phrase.ts"
import { recentCharactersCardNoBuilds } from "akasha/temper/web/phrase/pages/recent-characters-card-no-builds.temper-web-phrase.ts"
import { recentCharactersCardUntitled } from "akasha/temper/web/phrase/pages/recent-characters-card-untitled.temper-web-phrase.ts"
import { FolderOpen } from "lucide-react"

interface Build {
  id: string
  name: string
  buildData: CharacterState | null
  createdAt: number | null
  updatedAt: number
}

interface RecentCharactersCardProps {
  builds: readonly Build[]
}

const getClassName = (classId: ClassId) => classes.data[classId].name
const getRaceName = (raceId: RaceId) => races.data[raceId].name

export function RecentCharactersCard({ builds }: RecentCharactersCardProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  return (
    <PanelCard
      id="recent-characters"
      title={
        <Link href="/character-build" className="hover:text-accent">
          {phrase(recentCharactersCardHeading.slug)}
        </Link>
      }
      collapsible
    >
      {builds.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderOpen />
            </EmptyMedia>
            <EmptyTitle>{phrase(recentCharactersCardNoBuilds.slug)}</EmptyTitle>
            <EmptyDescription>{phrase(recentCharactersCardGetStarted.slug)}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <NewCharacterButton />
          </EmptyContent>
        </Empty>
      ) : (
        <div className="flex flex-col gap-2">
          {builds.map((build) => {
            const buildData = build.buildData
            const subtitle = [
              buildData?.character?.name,
              buildData?.character?.roles != null &&
                buildData.character.roles.length > 0 &&
                getRoleName(buildData.character.roles),
              buildData?.character?.class != null && getClassName(buildData.character.class),
              buildData?.character?.race != null && getRaceName(buildData.character.race),
            ]
              .filter((s): s is string => typeof s === "string" && s.length > 0)
              .join(" · ")

            return (
              <Link
                key={build.id}
                href={`${characterUrl(buildId(build.id), build.name)}?tab=character`}
                className={`group -mx-3 flex flex-col gap-1 rounded-lg ${surfaceClass(surface + 1)} px-3 py-2 transition-colors hover:bg-surface-3`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-medium text-primary">
                    {build.name !== "" ? build.name : phrase(recentCharactersCardUntitled.slug)}
                  </span>
                  <Text variant="caption" className="shrink-0">
                    {buildDateLine(build)}
                  </Text>
                </div>
                {subtitle !== "" && (
                  <CardDescription className="truncate">{subtitle}</CardDescription>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </PanelCard>
  )
}
