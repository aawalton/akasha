"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardDescription } from "@shared/design-primitives/components/card"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { Text } from "@shared/design-primitives/components/text"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { PagesUILink as Link } from "@shared/pages-ui/router-context"
import { getRoleName } from "@temper/game-characters-character/roles"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { ClassId } from "@temper/game-characters-classes/classes-data"
import { classes } from "@temper/game-characters-classes/classes-data"
import type { RaceId } from "@temper/game-characters-races/races"
import { races } from "@temper/game-characters-races/generated/temper-race.generated"
import { characterUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"
import { FolderOpen } from "lucide-react"
import { NewCharacterButton } from "@/components/characters/new-character-button"

interface Build {
  id: string
  name: string
  buildData: CharacterState | null
  createdAt: number
  updatedAt: number
}

interface RecentCharactersCardProps {
  builds: readonly Build[]
}

const getClassName = (classId: ClassId) => classes.data[classId].name
const getRaceName = (raceId: RaceId) => races.data[raceId].name

export function RecentCharactersCard({ builds }: RecentCharactersCardProps) {
  const surface = useSurface()
  return (
    <PanelCard
      id="recent-characters"
      title={
        <Link href="/character-builds" className="hover:text-accent">
          Character Builds
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
            <EmptyTitle>No builds yet</EmptyTitle>
            <EmptyDescription>Create your first build to get started.</EmptyDescription>
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
                href={`${characterUrl(BuildId(build.id), build.name)}?tab=character`}
                className={`group -mx-3 flex flex-col gap-1 rounded-lg ${surfaceClass(surface + 1)} px-3 py-2 transition-colors hover:bg-surface-3`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-medium text-primary">
                    {build.name !== "" ? build.name : "Untitled Build"}
                  </span>
                  <Text variant="caption" className="shrink-0">
                    {build.createdAt === build.updatedAt ? "Created" : "Updated"}{" "}
                    {new Date(build.updatedAt).toLocaleDateString()}
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
