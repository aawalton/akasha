"use client"

import { PanelCard } from "@akasha/design-layout/panel-card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import { CardDescription } from "@akasha/design-primitives/card"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Text } from "@akasha/design-primitives/text-body"
import { PagesUILink as Link } from "@akasha/pages-ui/navigation-context"
import { characterUrl } from "@akasha/temper-build-support/build-url"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import { getRoleName } from "@akasha/temper-character-sources/character-roles"
import { classes } from "@akasha/temper-classes/character-class"
import { buildId } from "@akasha/temper-formula-framework/branded-id"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { type RaceId, races } from "@akasha/temper-races/races"
import { FolderOpen } from "lucide-react"
import { NewCharacterButton } from "../new-character-button/new-character-button.module.code.tsx"

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
                href={`${characterUrl(buildId(build.id), build.name)}?tab=character`}
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
