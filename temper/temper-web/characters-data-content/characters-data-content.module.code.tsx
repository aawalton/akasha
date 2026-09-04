"use client"

import { Badge } from "@akasha/design-badges/badge"
import { ListContentSkeleton } from "@akasha/design-layout/list-content-skeleton"
import { PageTabHeader, PageTabTitleBadges } from "@akasha/design-layout/page-tab-header"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { useScrollRestoration } from "@akasha/design-patterns/use-scroll-restoration"
import { Card, CardContent } from "@akasha/design-primitives/card"
import { patchPage } from "@akasha/pages-access/patch"
import { useOptimisticPatchPage } from "@akasha/pages-ui/supabase/mutations/use-optimistic-patch-page"
import { decodeBuild } from "@akasha/temper-build-codec/build-codec"
import { applyCharacterMetadata } from "@akasha/temper-build-metadata/build-metadata"
import {
  useAllCharacterList,
  useCharacterLifecycle,
} from "@akasha/temper-characters-character-ui/use-characters"
import { buildHash as toBuildHash } from "@akasha/temper-formula-framework/branded-id"
import { useCompletionCharactersByUser } from "@akasha/temper-player-completion-ui/use-completion"
import { Trophy } from "lucide-react"
import { useCallback, useMemo, useRef } from "react"
import {
  BuildsBrowseTab,
  type DecodedBuild,
  useFilteredBuilds,
} from "../builds-browse-tab/builds-browse-tab.module.code.tsx"
import { CharactersFilterBar } from "../characters-filter-bar/characters-filter-bar.module.code.tsx"
import {
  type FilterValues,
  type SortField,
  TAB_LABELS,
  type TabValue,
} from "../characters-filter-types/characters-filter-types.module.code.ts"
import { PlanTab, usePlanEntities } from "../plan-tab/plan-tab.module.code.tsx"

interface CharactersDataContentProps {
  userId: string | null
  isAuthenticated: boolean
  tab: TabValue
  search: string
  selectedRole: string | null
  selectedClass: string | null
  sortBy: SortField
  sortDirection: SortDirection
  update: (values: Partial<FilterValues>) => void
  deferred: FilterValues
}

export function CharactersDataContent({
  userId,
  isAuthenticated,
  tab,
  search,
  selectedRole,
  selectedClass,
  sortBy,
  sortDirection,
  update,
  deferred,
}: CharactersDataContentProps) {
  const optimisticPatch = useOptimisticPatchPage((args) => patchPage(args))
  const { builds, isLoading: buildsLoading } = useAllCharacterList(userId)
  const {
    characters: completionCharacters,
    isLoading: charactersLoading,
    isDegraded: charactersUnconfirmed,
  } = useCompletionCharactersByUser(userId)
  const { setTarget } = useCharacterLifecycle()
  const isLoading = buildsLoading || charactersLoading

  const rawBuildMap = useMemo(() => new Map(builds.map((b) => [b.id, b])), [builds])

  const handleSetTarget = useCallback(
    (entityId: string, esoCharacterId: string, liveBuildId: string) => {
      if (userId == null) return
      const liveBuild = rawBuildMap.get(liveBuildId)
      if (!liveBuild || liveBuild.buildHash === "" || liveBuild.buildMetadata == null) return
      void setTarget({
        entityId,
        esoCharacterId,
        newBuildId: crypto.randomUUID(),
        buildHash: liveBuild.buildHash,
        buildMetadata: liveBuild.buildMetadata,
      })
    },
    [rawBuildMap, setTarget, userId]
  )

  const visibleCountRef = useRef<number | undefined>(undefined)
  const { restoredVisibleCount } = useScrollRestoration({
    key: `characters:${tab}`,
    filterHash: `${search}|${selectedRole}|${selectedClass}|${sortBy}|${sortDirection}`,
    visibleCount: visibleCountRef.current,
  })

  const handleVisibleCountChange = useCallback((count: number) => {
    visibleCountRef.current = count
  }, [])

  const paginationResetKey = useMemo(
    () => JSON.stringify({ tab, search, selectedRole, selectedClass, sortBy, sortDirection }),
    [tab, search, selectedRole, selectedClass, sortBy, sortDirection]
  )

  const handleSearchChange = (value: string) => update({ search: value })
  const handleRoleChange = (value: string | null) => update({ role: value })
  const handleClassChange = (value: string | null) => update({ class: value })
  const handleSortChange = (newSort: SortField, newDirection: SortDirection) =>
    update({ sortBy: newSort, sortDirection: newDirection })

  const hasActiveFilters =
    search.length > 0 ||
    selectedRole !== null ||
    selectedClass !== null ||
    sortBy !== "updated" ||
    sortDirection !== "desc"

  const clearAllFilters = () =>
    update({
      search: "",
      role: null,
      class: null,
      sortBy: "updated",
      sortDirection: "desc",
    })

  const decodedBuilds = useMemo<DecodedBuild[]>(() => {
    return builds.map((build) => {
      const metadata = build.buildMetadata
      const decoded = build.buildHash !== "" ? decodeBuild(toBuildHash(build.buildHash)) : null
      const buildData = decoded && metadata ? applyCharacterMetadata(decoded, metadata) : null
      return {
        id: build.id,
        userId: build.userId,
        visibility: build.visibility,
        createdAt: build.createdAt,
        updatedAt: build.updatedAt,
        name: metadata?.name ?? "",
        description: metadata?.description ?? "",
        buildData,
      }
    })
  }, [builds])

  const filteredBuilds = useFilteredBuilds({ decodedBuilds, tab, userId, deferred })

  const { planEntities, liveOnlyEntities } = usePlanEntities({
    decodedBuilds,
    completionCharacters,
    userId,
  })

  const showCurrentList = tab === "plan"
  const showBuildList = tab === "build" || tab === "browse"

  const planCount = planEntities.length + liveOnlyEntities.length
  const importedCharacterCount = completionCharacters.length

  const titleBadge =
    showCurrentList && planCount > 0 ? (
      <Badge variant="elevation-muted">{planCount}</Badge>
    ) : showBuildList && filteredBuilds.length > 0 ? (
      <Badge variant="elevation-muted">{filteredBuilds.length}</Badge>
    ) : undefined

  if (isLoading) return <ListContentSkeleton />

  return (
    <div className="flex flex-col gap-6">
      <PageTabHeader
        title={TAB_LABELS[tab]}
        titleTrailing={
          titleBadge ? <PageTabTitleBadges>{titleBadge}</PageTabTitleBadges> : undefined
        }
      >
        {showBuildList && (
          <CharactersFilterBar
            search={search}
            onSearchChange={handleSearchChange}
            selectedRole={selectedRole}
            onRoleChange={handleRoleChange}
            selectedClass={selectedClass}
            onClassChange={handleClassChange}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
            hasActiveFilters={hasActiveFilters}
            onReset={clearAllFilters}
          />
        )}
      </PageTabHeader>

      {showCurrentList && (
        <PlanTab
          planEntities={planEntities}
          liveOnlyEntities={liveOnlyEntities}
          userId={userId}
          optimisticPatch={optimisticPatch}
          onSetTarget={handleSetTarget}
          charactersUnconfirmed={charactersUnconfirmed}
          importedCharacterCount={importedCharacterCount}
        />
      )}

      {tab === "leaderboard" && (
        <Card>
          <CardContent>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Trophy />
                </EmptyMedia>
                <EmptyTitle>Coming soon</EmptyTitle>
                <EmptyDescription>
                  Character build leaderboards are coming in a future update.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>
      )}

      {showBuildList && (
        <BuildsBrowseTab
          filteredBuilds={filteredBuilds}
          tab={tab}
          userId={userId}
          isAuthenticated={isAuthenticated}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearAllFilters}
          restoredVisibleCount={restoredVisibleCount}
          onVisibleCountChange={handleVisibleCountChange}
          paginationResetKey={paginationResetKey}
        />
      )}
    </div>
  )
}
