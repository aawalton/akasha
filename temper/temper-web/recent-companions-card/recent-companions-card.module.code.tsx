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
import { companionUrl } from "@akasha/temper-build-support/build-url"
import { getBaseRoleName } from "@akasha/temper-companions-core/companion-base-roles"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { getCompanionName } from "@akasha/temper-companions-core/companions"
import { buildId } from "@akasha/temper-formula-framework/branded-id"
import { FolderOpen } from "lucide-react"
import { NewCompanionButton } from "../new-companion-button/new-companion-button.module.code.tsx"

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
                href={`${companionUrl(buildId(build.id), build.name)}?tab=companion`}
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
