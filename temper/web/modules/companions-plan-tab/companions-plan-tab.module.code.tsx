"use client"

import { PageTabHeader } from "akasha/design/interface/layout/modules/page-tab-header/page-tab-header.module.code.tsx"
import { PanelToggleProvider } from "akasha/design/interface/layout/modules/panel-toggle-provider/panel-toggle-provider.module.code.tsx"
import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { LayoutLink } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { TabsContent } from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import type { CompanionBaseRoleId } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import type { ComboRankingsMap } from "akasha/temper/catalog/companion/companions-core/modules/companion-leaderboard/companion-leaderboard.module.code.ts"
import type { CompanionId } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { getCompanionName } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import {
  CompanionEntityPanelCard,
  type CompanionPlanEntity,
} from "akasha/temper/web/modules/companion-entity-panel-card/companion-entity-panel-card.module.code.tsx"
import {
  type CompanionLiveOnlyEntity,
  CompanionLiveOnlyPanelCard,
} from "akasha/temper/web/modules/companion-live-only-panel-card/companion-live-only-panel-card.module.code.tsx"
import {
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionsPlanTabCheckSync } from "akasha/temper/web/phrase/pages/companions-plan-tab-check-sync.temper-web-phrase.ts"
import { companionsPlanTabNoAttachedBuilds } from "akasha/temper/web/phrase/pages/companions-plan-tab-no-attached-builds.temper-web-phrase.ts"
import { companionsPlanTabPlan } from "akasha/temper/web/phrase/pages/companions-plan-tab-plan.temper-web-phrase.ts"
import { Gamepad2 } from "lucide-react"
import { useMemo } from "react"

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
  const phrase = usePhrase()
  const describe = usePhraseDescription()
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
          <PageTabHeader title={phrase(companionsPlanTabPlan.slug)} />
          {planCount === 0 && (
            <Card>
              <CardContent>
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Gamepad2 />
                    </EmptyMedia>
                    <EmptyTitle>{phrase(companionsPlanTabNoAttachedBuilds.slug)}</EmptyTitle>
                    <EmptyDescription>
                      {describe(companionsPlanTabNoAttachedBuilds.slug)}
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button variant="secondary" asChild>
                      <LayoutLink href="/watcher">
                        {phrase(companionsPlanTabCheckSync.slug)}
                      </LayoutLink>
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
