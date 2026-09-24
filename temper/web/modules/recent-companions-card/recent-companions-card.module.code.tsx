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
import { getBaseRoleName } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import { getCompanionName } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { companionUrl } from "akasha/temper/player/character/build/build-support/modules/build-url/build-url.module.code.ts"
import { buildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { NewCompanionButton } from "akasha/temper/web/modules/new-companion-button/new-companion-button.module.code.tsx"
import { FolderOpen } from "lucide-react"

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
        <Link href="/companion-build" className="hover:text-accent">
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
