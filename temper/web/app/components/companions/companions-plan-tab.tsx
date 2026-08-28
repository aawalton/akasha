"use client"

import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { PanelToggleProvider } from "@shared/design-layout/components/panel-toggle-provider"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { LayoutLink } from "@shared/design-layout/router-context"
import { Button } from "@shared/design-primitives/components/button"
import { Card, CardContent } from "@shared/design-primitives/components/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { TabsContent } from "@shared/design-patterns/components/tabs"
import type { CompanionBaseRoleId } from "@temper/game-companions-core/companion-base-roles-data"
import type { ComboRankingsMap } from "@temper/game-companions-core/companion-leaderboard"
import type { CompanionId } from "@temper/game-companions-core/companions-data"
import { getCompanionName } from "@temper/game-companions-core/companions-data"
import { Gamepad2 } from "lucide-react"
import { useMemo } from "react"
import {
  CompanionEntityPanelCard,
  type CompanionPlanEntity,
} from "@/components/companions/companion-entity-panel-card"
import {
  type CompanionLiveOnlyEntity,
  CompanionLiveOnlyPanelCard,
} from "@/components/companions/companion-live-only-panel-card"

interface CompanionsPlanTabProps {
  active: boolean
  planEntities: readonly CompanionPlanEntity[]
  liveOnlyEntities: readonly CompanionLiveOnlyEntity[]
  onUpdateEntityRoles: (companionId: CompanionId, roles: readonly CompanionBaseRoleId[]) => void
  onRankClick: (companionId: CompanionId, entityRoles: readonly CompanionBaseRoleId[]) => void
  onBrowseClick: (companionId: CompanionId, roles: readonly CompanionBaseRoleId[]) => void
  onTrophyClick: (
    entityId: string,
    sourceBuildId: string,
    companionName: string,
    targetManuallyEdited: boolean
  ) => void
  onSetTarget: (entityId: string, sourceBuildId: string, companionName: string) => void
  onReorder: (entityId: string, newIndex: number) => void
  rankingsMap: ComboRankingsMap
  overallRankMap: Map<CompanionId, number>
}

export function CompanionsPlanTab({
  active,
  planEntities,
  liveOnlyEntities,
  onUpdateEntityRoles,
  onRankClick,
  onBrowseClick,
  onTrophyClick,
  onSetTarget,
  onReorder,
  rankingsMap,
  overallRankMap,
}: CompanionsPlanTabProps) {
  const sortedEntities = useMemo(
    () => [...planEntities].sort((a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity)),
    [planEntities]
  )

  const sortedLiveOnly = useMemo(
    () =>
      [...liveOnlyEntities].sort((a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity)),
    [liveOnlyEntities]
  )

  const planCount = planEntities.length + liveOnlyEntities.length

  return (
    <TabsContent value="plan">
      <PanelToggleProvider active={active}>
        <div className="flex flex-col gap-6">
          <PageTabHeader title="Plan" />
          {planCount === 0 && (
            <Card>
              <CardContent>
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Gamepad2 />
                    </EmptyMedia>
                    <EmptyTitle>No builds attached to your companions</EmptyTitle>
                    <EmptyDescription>
                      Planning compares a companion's current build against a target, and none of
                      your companions has a build attached yet. Importing from the game does not
                      attach one, so importing again will not change this.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button variant="secondary" asChild>
                      <LayoutLink href="/watcher">Check sync status</LayoutLink>
                    </Button>
                  </EmptyContent>
                </Empty>
              </CardContent>
            </Card>
          )}
          {planCount > 0 && (
            <ResponsiveColumns sortChildren={false}>
              {sortedEntities.map((entity, index) => (
                <CompanionEntityPanelCard
                  key={entity.entityId}
                  entity={entity}
                  getCompanionName={getCompanionName}
                  onUpdateEntityRoles={onUpdateEntityRoles}
                  onRankClick={onRankClick}
                  onBrowseClick={onBrowseClick}
                  onTrophyClick={onTrophyClick}
                  onReorder={onReorder}
                  priorityIndex={index + 1}
                  totalEntities={sortedEntities.length}
                  rankingsMap={rankingsMap}
                  overallRankMap={overallRankMap}
                />
              ))}
              {sortedLiveOnly.map((entity) => (
                <CompanionLiveOnlyPanelCard
                  key={entity.entityId}
                  entity={entity}
                  getCompanionName={getCompanionName}
                  onSetTarget={onSetTarget}
                />
              ))}
            </ResponsiveColumns>
          )}
        </div>
      </PanelToggleProvider>
    </TabsContent>
  )
}
