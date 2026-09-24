"use client"

import { ListContentSkeleton } from "akasha/design/interface/layout/modules/list-content-skeleton/list-content-skeleton.module.code.tsx"
import { scrollToCard } from "akasha/design/interface/layout/modules/scroll-to-card/scroll-to-card.module.code.ts"
import { useScrollRestoration } from "akasha/design/interface/pattern/modules/use-scroll-restoration/use-scroll-restoration.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { useOptimisticPatchPage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import type { CompanionBaseRoleId } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import {
  buildOverallRankMap,
  buildRankingsMap,
  displayRoleComboKey,
  mapBaseRolesToDisplayRoles,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-leaderboard/companion-leaderboard.module.code.ts"
import type { CompanionId } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { companionAddressOf } from "akasha/temper/catalog/companion/temper-eso-companion/modules/companion-address/companion-address.module.code.ts"
import { decodeCompanion } from "akasha/temper/player/character/build/companion-codec/modules/companion-codec/companion-codec.module.code.ts"
import { buildHash as toBuildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { useAllCompanionList } from "akasha/temper/web/companions-ui/modules/use-companions/use-companions.module.code.ts"
import { applyCompanionMetadata } from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import { CompanionsBuildBrowseTab } from "akasha/temper/web/modules/companions-build-browse-tab/companions-build-browse-tab.module.code.tsx"
import type { FilterValues } from "akasha/temper/web/modules/companions-filter-types/companions-filter-types.module.code.ts"
import { CompanionsLeaderboardTab } from "akasha/temper/web/modules/companions-leaderboard-tab/companions-leaderboard-tab.module.code.tsx"
import { CompanionsPlanTab } from "akasha/temper/web/modules/companions-plan-tab/companions-plan-tab.module.code.tsx"
import { SetTargetConfirmDialog } from "akasha/temper/web/modules/set-target-confirm-dialog/set-target-confirm-dialog.module.code.tsx"
import {
  ownerIdOf,
  useAccountAddress,
} from "akasha/temper/web/modules/use-account-address/use-account-address.module.code.ts"
import { usePlanEntities } from "akasha/temper/web/modules/use-companion-plan-entities/use-companion-plan-entities.module.code.ts"
import { useFilteredBuilds } from "akasha/temper/web/modules/use-filtered-builds/use-filtered-builds.module.code.ts"
import { usePlanSetTarget } from "akasha/temper/web/modules/use-plan-set-target/use-plan-set-target.module.code.ts"
import { useCompletionCompanions } from "akasha/temper/web/player-completion-ui/modules/use-completion/use-completion.module.code.ts"
import { useCallback, useEffect, useMemo, useRef } from "react"

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
  const account = useAccountAddress(userId)
  const accountPage = account.address
  const { builds, isLoading: buildsLoading } = useAllCompanionList(userId)
  const { companions: completionCompanions, isLoading: companionsLoading } =
    useCompletionCompanions()
  const isLoading = account.isLoading || buildsLoading || companionsLoading

  const buildMap = useMemo(() => new Map(builds.map((b) => [b.id, b])), [builds])

  const handleUpdateEntityRoles = useCallback(
    (companionId: CompanionId, roles: readonly CompanionBaseRoleId[]) => {
      if (accountPage == null) return
      void optimisticPatch({
        pageTypeSlug: "temper-companion-progress",
        where: [
          { key: "accountPage", eq: accountPage },
          { key: "companionId", eq: companionAddressOf(companionId) },
        ],
        set: { roles: [...roles] },
      })
    },
    [optimisticPatch, accountPage]
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
      const decoded = build.buildHash !== "" ? decodeCompanion(toBuildHash(build.buildHash)) : null
      const buildData = decoded && metadata ? applyCompanionMetadata(decoded, metadata) : null
      return {
        id: build.id,
        userId: ownerIdOf(build.accountPage, accountPage, userId),
        visibility: build.visibility,
        createdAt: build.createdAt,
        updatedAt: build.updatedAt,
        name: metadata?.name ?? "",
        description: metadata?.description ?? "",
        buildData,
      }
    })
  }, [builds, accountPage, userId])

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
      if (accountPage == null) return
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
              { key: "accountPage", eq: accountPage },
              { key: "companionId", eq: companionAddressOf(entity.companionId) },
            ],
            set: { displayOrder: index },
          })
        )
      )
    },
    [optimisticPatch, accountPage, planEntities]
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
