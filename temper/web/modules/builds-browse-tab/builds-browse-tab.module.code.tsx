"use client"

import { PaginatedCardGrid } from "akasha/design/interface/layout/modules/paginated-card-grid/paginated-card-grid.module.code.tsx"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { getRoleName } from "akasha/temper/player/character/source/modules/character-roles/character-roles.module.code.ts"
import type { TabValue } from "akasha/temper/web/modules/build-page-tab/build-page-tab.module.code.ts"
import { CharacterListCardWithHandle } from "akasha/temper/web/modules/character-list-card-with-handle/character-list-card-with-handle.module.code.tsx"
import {
  type FilterValues,
  getClassName,
  getRaceName,
  roleFilterOf,
} from "akasha/temper/web/modules/characters-filter-types/characters-filter-types.module.code.ts"
import { NewCharacterButton } from "akasha/temper/web/modules/new-character-button/new-character-button.module.code.tsx"
import { NewCharacterPanelCard } from "akasha/temper/web/modules/new-character-panel-card/new-character-panel-card.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { buildsBrowseTabCharacters } from "akasha/temper/web/phrase/pages/builds-browse-tab-characters.temper-web-phrase.ts"
import { buildsBrowseTabClearFilters } from "akasha/temper/web/phrase/pages/builds-browse-tab-clear-filters.temper-web-phrase.ts"
import { buildsBrowseTabCreateFirst } from "akasha/temper/web/phrase/pages/builds-browse-tab-create-first.temper-web-phrase.ts"
import { buildsBrowseTabNoBuildsFound } from "akasha/temper/web/phrase/pages/builds-browse-tab-no-builds-found.temper-web-phrase.ts"
import { buildsBrowseTabNoBuildsYet } from "akasha/temper/web/phrase/pages/builds-browse-tab-no-builds-yet.temper-web-phrase.ts"
import { buildsBrowseTabNoMatching } from "akasha/temper/web/phrase/pages/builds-browse-tab-no-matching.temper-web-phrase.ts"
import { buildsBrowseTabPublicBuilds } from "akasha/temper/web/phrase/pages/builds-browse-tab-public-builds.temper-web-phrase.ts"
import { buildsBrowseTabTryAdjusting } from "akasha/temper/web/phrase/pages/builds-browse-tab-try-adjusting.temper-web-phrase.ts"
import { FolderOpen, Search } from "lucide-react"
import { useCallback, useMemo } from "react"

export interface DecodedBuild {
  id: string
  userId: string
  visibility: string
  createdAt: number | null
  updatedAt: number
  name: string
  description: string
  buildData: CharacterState | null
}

export function useFilteredBuilds({
  decodedBuilds,
  tab,
  userId,
  deferred,
}: {
  decodedBuilds: readonly DecodedBuild[]
  tab: TabValue
  userId: string | null
  deferred: FilterValues
}): readonly DecodedBuild[] {
  return useMemo(() => {
    const {
      search: dSearch,
      role: dRole,
      class: dClass,
      sortBy: dSortBy,
      sortDirection: dSortDir,
    } = deferred
    return decodedBuilds
      .filter((build) => {
        const buildData = build.buildData
        if (!buildData) return false

        if (tab === "build" && build.userId !== userId) return false
        if (tab === "build" && build.visibility === "live") return false
        if (tab === "browse" && build.visibility !== "public") return false

        if (dSearch !== "" && !build.name.toLowerCase().includes(dSearch.toLowerCase())) {
          return false
        }

        if (dRole != null && !buildData.character?.roles?.includes(roleFilterOf(dRole))) {
          return false
        }

        if (dClass != null && buildData.character?.class !== dClass) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        const direction = dSortDir === "asc" ? 1 : -1
        if (dSortBy === "name") {
          return a.name.localeCompare(b.name) * direction
        }
        const timeDiff = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        return timeDiff * direction
      })
  }, [decodedBuilds, tab, userId, deferred])
}

interface BuildsBrowseTabProps {
  filteredBuilds: readonly DecodedBuild[]
  tab: TabValue
  userId: string | null
  isAuthenticated: boolean
  hasActiveFilters: boolean
  onClearFilters: () => void
  restoredVisibleCount: number | null
  onVisibleCountChange: (count: number) => void
  paginationResetKey: string
}

export function BuildsBrowseTab({
  filteredBuilds,
  tab,
  userId,
  isAuthenticated,
  hasActiveFilters,
  onClearFilters,
  restoredVisibleCount,
  onVisibleCountChange,
  paginationResetKey,
}: BuildsBrowseTabProps) {
  const phrase = usePhrase()
  const renderCharacterCard = useCallback(
    (build: DecodedBuild) => (
      <CharacterListCardWithHandle
        key={build.id}
        build={build}
        getClassName={getClassName}
        getRaceName={getRaceName}
        getRoleName={getRoleName}
        currentUserId={userId}
      />
    ),
    [userId]
  )

  if (filteredBuilds.length === 0 && !hasActiveFilters) {
    return (
      <Card>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderOpen />
              </EmptyMedia>
              <EmptyTitle>
                {phrase(
                  tab === "build"
                    ? buildsBrowseTabNoBuildsYet.slug
                    : buildsBrowseTabNoBuildsFound.slug
                )}
              </EmptyTitle>
              <EmptyDescription>
                {phrase(
                  tab === "build"
                    ? buildsBrowseTabCreateFirst.slug
                    : buildsBrowseTabPublicBuilds.slug
                )}
              </EmptyDescription>
            </EmptyHeader>
            {tab === "build" && isAuthenticated && (
              <EmptyContent>
                <NewCharacterButton />
              </EmptyContent>
            )}
          </Empty>
        </CardContent>
      </Card>
    )
  }

  if (filteredBuilds.length === 0 && hasActiveFilters) {
    return (
      <Card>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Search />
              </EmptyMedia>
              <EmptyTitle>{phrase(buildsBrowseTabNoMatching.slug)}</EmptyTitle>
              <EmptyDescription>{phrase(buildsBrowseTabTryAdjusting.slug)}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="secondary" size="sm" onClick={onClearFilters}>
                {phrase(buildsBrowseTabClearFilters.slug)}
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    )
  }

  return (
    <PaginatedCardGrid
      items={filteredBuilds}
      renderItem={renderCharacterCard}
      itemLabel={phrase(buildsBrowseTabCharacters.slug)}
      initialVisibleCount={restoredVisibleCount ?? undefined}
      onVisibleCountChange={onVisibleCountChange}
      resetKey={paginationResetKey}
      trailingContent={tab === "build" && isAuthenticated ? <NewCharacterPanelCard /> : undefined}
    />
  )
}
