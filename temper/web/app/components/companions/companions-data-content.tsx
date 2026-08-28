"use client"

import { scrollToCard } from "@shared/design-layout/utils/scroll-to-card"
import { ListContentSkeleton } from "@shared/design-layout/components/list-content-skeleton"
import { useScrollRestoration } from "@shared/design-patterns/hooks/use-scroll-restoration"
import { patchPage } from "@shared/pages-access/patch"
import { useOptimisticPatchPage } from "@shared/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { applyCompanionMetadata } from "@temper/game-characters/build-metadata"
import { decodeCompanion } from "@temper/game-codec/companions/companion-codec"
import type { CompanionBaseRoleId } from "@temper/game-companions-core/companion-base-roles-data"
import {
  buildOverallRankMap,
  buildRankingsMap,
  displayRoleComboKey,
  mapBaseRolesToDisplayRoles,
} from "@temper/game-companions-core/companion-leaderboard"
import type { CompanionId } from "@temper/game-companions-core/companions-data"
import { useAllCompanionList } from "@temper/game-companions-ui/use-companions"
import { useCompletionCompanions } from "@temper/player-completion-ui/use-completion"
import { BuildHash } from "@temper/shared-formula-framework/branded"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { CompanionsBuildBrowseTab } from "@/components/companions/companions-build-browse-tab"
import type { FilterValues } from "@/components/companions/companions-filter-types"
import { CompanionsLeaderboardTab } from "@/components/companions/companions-leaderboard-tab"
import { CompanionsPlanTab } from "@/components/companions/companions-plan-tab"
import { usePlanEntities } from "@/components/companions/use-companion-plan-entities"
import { useFilteredBuilds } from "@/components/companions/use-filtered-builds"
import { usePlanSetTarget } from "@/components/companions/use-plan-set-target"
import { SetTargetConfirmDialog } from "@/components/ui/set-target-confirm-dialog"

interface CompanionsDataContentProps {
  userId: string | null
  isAuthenticated: boolean
  values: FilterValues
  update: (values: Partial<FilterValues>, options?: { push?: boolean }) => void
  deferred: FilterValues
}

export function CompanionsDataContent({
  userId,
  isAuthenticated,
  values,
  update,
  deferred,
}: CompanionsDataContentProps) {
  const optimisticPatch = useOptimisticPatchPage((args) => patchPage(args))
  const { builds, isLoading: buildsLoading } = useAllCompanionList(userId)
  const { companions: completionCompanions, isLoading: companionsLoading } =
    useCompletionCompanions()
  const isLoading = buildsLoading || companionsLoading

  const buildMap = useMemo(() => new Map(builds.map((b) => [b.id, b])), [builds])

  const handleUpdateEntityRoles = useCallback(
    (companionId: CompanionId, roles: readonly CompanionBaseRoleId[]) => {
      if (userId == null) return
      void optimisticPatch({
        pageTypeSlug: "temper-companion-progress",
        where: [
          { key: "accountPage", eq: userId },
          { key: "companionId", eq: companionId },
        ],
        set: { roles: [...roles] },
      })
    },
    [optimisticPatch, userId]
  )

  const pendingScrollRef = useRef<{ cardId: string; tabChanged: boolean } | null>(null)

  useEffect(() => {
    const pending = pendingScrollRef.current
    if (pending) {
      pendingScrollRef.current = null
      scrollToCard(pending.cardId, pending.tabChanged)
    }
  }, [values.tab])

  const handleRankClick = useCallback(
    (companionId: CompanionId, entityRoles: readonly CompanionBaseRoleId[]) => {
      const cardId =
        entityRoles.length === 0
          ? `companion-leaderboard-${companionId}`
          : `role-leaderboard-${displayRoleComboKey(mapBaseRolesToDisplayRoles(entityRoles))}`
      if (values.tab === "leaderboard") {
        scrollToCard(cardId, false)
      } else {
        pendingScrollRef.current = { cardId, tabChanged: true }
        update({ tab: "leaderboard" }, { push: true })
      }
    },
    [values.tab, update]
  )

  const handleBrowseClick = useCallback(
    (companionId: CompanionId, roles: readonly CompanionBaseRoleId[]) => {
      update({ tab: "browse", companion: companionId, roles }, { push: true })
    },
    [update]
  )

  const { pendingTrophyConfirm, setPendingTrophyConfirm, handleTrophyClick, handleTrophyConfirm } =
    usePlanSetTarget({ buildMap, completionCompanions })

  const { tab, leaderboardTargetArmor, leaderboardTargetCount, leaderboardTargetHealth } = values

  const visibleCountRef = useRef<number | undefined>(undefined)
  const { restoredVisibleCount } = useScrollRestoration({
    key: `companions:${tab}`,
    filterHash: `${values.search}|${values.roles.join(",")}|${values.companion}|${values.targetArmor}|${values.targetCount}|${values.targetHealth}|${values.sortBy}|${values.sortDirection}`,
    visibleCount: visibleCountRef.current,
  })

  const handleVisibleCountChange = useCallback((count: number) => {
    visibleCountRef.current = count
  }, [])

  const decodedBuilds = useMemo(() => {
    return builds.map((build) => {
      const metadata = build.buildMetadata
      const decoded = build.buildHash !== "" ? decodeCompanion(BuildHash(build.buildHash)) : null
      const buildData = decoded && metadata ? applyCompanionMetadata(decoded, metadata) : null
      return {
        id: build.id,
        userId: build.userId ?? "",
        visibility: build.visibility,
        createdAt: build.createdAt,
        updatedAt: build.updatedAt,
        name: metadata?.name ?? "",
        description: metadata?.description ?? "",
        buildData,
      }
    })
  }, [builds])

  const planRankingsMap = useMemo(
    () => buildRankingsMap(decodedBuilds, null, null, null),
    [decodedBuilds]
  )

  const leaderboardRankingsMap = useMemo(
    () =>
      buildRankingsMap(
        decodedBuilds,
        leaderboardTargetArmor,
        leaderboardTargetCount,
        leaderboardTargetHealth
      ),
    [decodedBuilds, leaderboardTargetArmor, leaderboardTargetCount, leaderboardTargetHealth]
  )

  const planOverallRankMap = useMemo(() => buildOverallRankMap(decodedBuilds), [decodedBuilds])

  const filteredBuilds = useFilteredBuilds(decodedBuilds, deferred, userId)

  const { planEntities, liveOnlyEntities } = usePlanEntities(
    decodedBuilds,
    builds,
    completionCompanions,
    userId
  )

  const handleLiveOnlySetTarget = useCallback(
    (entityId: string, sourceBuildId: string, companionName: string) => {
      handleTrophyClick(entityId, sourceBuildId, companionName, false)
    },
    [handleTrophyClick]
  )

  const handleReorder = useCallback(
    (entityId: string, newIndex: number) => {
      if (userId == null) return
      const ordered = [...planEntities].sort(
        (a, b) => (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity)
      )
      const currentIndex = ordered.findIndex((e) => e.entityId === entityId)
      if (currentIndex === -1 || currentIndex === newIndex) return
      const [moved] = ordered.splice(currentIndex, 1)
      if (!moved) return
      ordered.splice(newIndex, 0, moved)
      void Promise.all(
        ordered.map((entity, index) =>
          optimisticPatch({
            pageTypeSlug: "temper-companion-progress",
            where: [
              { key: "accountPage", eq: userId },
              { key: "companionId", eq: entity.companionId },
            ],
            set: { sortOrder: index },
          })
        )
      )
    },
    [optimisticPatch, userId, planEntities]
  )

  if (isLoading) return <ListContentSkeleton />

  return (
    <>
      <CompanionsPlanTab
        active={tab === "plan"}
        planEntities={planEntities}
        liveOnlyEntities={liveOnlyEntities}
        onUpdateEntityRoles={handleUpdateEntityRoles}
        onRankClick={handleRankClick}
        onBrowseClick={handleBrowseClick}
        onTrophyClick={handleTrophyClick}
        onSetTarget={handleLiveOnlySetTarget}
        onReorder={handleReorder}
        rankingsMap={planRankingsMap}
        overallRankMap={planOverallRankMap}
      />

      <CompanionsBuildBrowseTab
        active={tab === "build"}
        tab="build"
        isAuthenticated={isAuthenticated}
        userId={userId}
        values={values}
        update={update}
        filteredBuilds={filteredBuilds}
        initialVisibleCount={restoredVisibleCount ?? undefined}
        onVisibleCountChange={handleVisibleCountChange}
      />

      <CompanionsBuildBrowseTab
        active={tab === "browse"}
        tab="browse"
        isAuthenticated={isAuthenticated}
        userId={userId}
        values={values}
        update={update}
        filteredBuilds={filteredBuilds}
        initialVisibleCount={restoredVisibleCount ?? undefined}
        onVisibleCountChange={handleVisibleCountChange}
      />

      <CompanionsLeaderboardTab
        active={tab === "leaderboard"}
        builds={decodedBuilds}
        rankingsMap={leaderboardRankingsMap}
        leaderboardTargetArmor={leaderboardTargetArmor}
        leaderboardTargetCount={leaderboardTargetCount}
        leaderboardTargetHealth={leaderboardTargetHealth}
        onLeaderboardFilterChange={update}
      />

      <SetTargetConfirmDialog
        open={pendingTrophyConfirm !== null}
        onOpenChange={(open) => !open && setPendingTrophyConfirm(null)}
        entityName={pendingTrophyConfirm?.companionName ?? ""}
        onConfirm={handleTrophyConfirm}
      />
    </>
  )
}
