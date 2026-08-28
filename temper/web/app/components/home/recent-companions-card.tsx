"use client"

import { PanelCard } from "@shared/design-layout/components/panel-card"
import { CardDescription } from "@shared/design-primitives/components/card"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { Text } from "@shared/design-primitives/components/text"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { PagesUILink as Link } from "@shared/pages-ui/router-context"
import { getBaseRoleName } from "@temper/game-companions-core/companion-base-roles-data"
import type { CompanionState } from "@temper/game-companions-core/companion-types"
import { getCompanionName } from "@temper/game-companions-core/companions-data"
import { companionUrl } from "@temper/shared-engine/utils/slug"
import { BuildId } from "@temper/shared-formula-framework/branded"
import { FolderOpen } from "lucide-react"
import { NewCompanionButton } from "@/components/companions/new-companion-button"

interface Build {
  id: string
  name: string
  buildData: CompanionState | null
  createdAt: number
  updatedAt: number
}

interface RecentCompanionsCardProps {
  builds: readonly Build[]
}

export function RecentCompanionsCard({ builds }: RecentCompanionsCardProps) {
  const surface = useSurface()
  return (
    <PanelCard
      id="recent-companions"
      title={
        <Link href="/companion-builds" className="hover:text-accent">
          Companion Builds
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
            <NewCompanionButton />
          </EmptyContent>
        </Empty>
      ) : (
        <div className="flex flex-col gap-2">
          {builds.map((build) => {
            const buildData = build.buildData
            const subtitle = [
              buildData?.companion?.id != null &&
                buildData.companion.id !== "no-companion" &&
                getCompanionName(buildData.companion.id),
              buildData?.companion?.baseRoles != null &&
                buildData.companion.baseRoles.length > 0 &&
                getBaseRoleName(buildData.companion.baseRoles),
            ]
              .filter((s): s is string => typeof s === "string" && s.length > 0)
              .join(" · ")

            return (
              <Link
                key={build.id}
                href={`${companionUrl(BuildId(build.id), build.name)}?tab=companion`}
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
