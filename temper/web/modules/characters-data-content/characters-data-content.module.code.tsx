"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { ListContentSkeleton } from "akasha/design/interface/layout/modules/list-content-skeleton/list-content-skeleton.module.code.tsx"
import {
  PageTabHeader,
  PageTabTitleBadges,
} from "akasha/design/interface/layout/modules/page-tab-header/page-tab-header.module.code.tsx"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import {
  searchChanging,
  sortChanging,
} from "akasha/design/interface/pattern/modules/filter-changing/filter-changing.module.code.ts"
import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import { useScrollRestoration } from "akasha/design/interface/pattern/modules/use-scroll-restoration/use-scroll-restoration.module.code.ts"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { useOptimisticPatchPage } from "akasha/page/ui/supabase/mutation/modules/use-optimistic-patch-page/use-optimistic-patch-page.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { buildHash as toBuildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import {
  useAllCharacterList,
  useCharacterLifecycle,
} from "akasha/temper/web/characters-character-ui/modules/use-characters/use-characters.module.code.ts"
import { applyCharacterMetadata } from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import type { TabValue } from "akasha/temper/web/modules/build-page-tab/build-page-tab.module.code.ts"
import {
  BuildsBrowseTab,
  type DecodedBuild,
  useFilteredBuilds,
} from "akasha/temper/web/modules/builds-browse-tab/builds-browse-tab.module.code.tsx"
import { CharactersFilterBar } from "akasha/temper/web/modules/characters-filter-bar/characters-filter-bar.module.code.tsx"
import {
  type FilterValues,
  type SortField,
  TAB_LABELS,
} from "akasha/temper/web/modules/characters-filter-types/characters-filter-types.module.code.ts"
import {
  PlanTab,
  usePlanEntities,
} from "akasha/temper/web/modules/plan-tab/plan-tab.module.code.tsx"
import {
  ownerIdOf,
  useAccountAddress,
} from "akasha/temper/web/modules/use-account-address/use-account-address.module.code.ts"
import { useCompletionCharactersByUser } from "akasha/temper/web/player-completion-ui/modules/use-completion/use-completion.module.code.ts"
import { Trophy } from "lucide-react"
import { useCallback, useMemo, useRef } from "react"

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
  const account = useAccountAddress(userId)
  const accountPage = account.address
  const { builds, isLoading: buildsLoading } = useAllCharacterList(userId)
  const {
    characters: completionCharacters,
    isLoading: charactersLoading,
    isDegraded: charactersUnconfirmed,
  } = useCompletionCharactersByUser(userId)
  const { setTarget } = useCharacterLifecycle()
  const isLoading = account.isLoading || buildsLoading || charactersLoading

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

  const handleSearchChange = searchChanging(update)
  const handleRoleChange = (value: string | null) => update({ role: value })
  const handleClassChange = (value: string | null) => update({ class: value })
  const handleSortChange = sortChanging<SortField>(update)

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
