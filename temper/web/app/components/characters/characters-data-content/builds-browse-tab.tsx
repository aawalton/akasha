"use client"

import { PaginatedCardGrid } from "@shared/design-layout/components/paginated-card-grid"
import { Button } from "@shared/design-primitives/components/button"
import { Card, CardContent } from "@shared/design-primitives/components/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { getRoleName } from "@temper/game-characters-character/roles"
import type { CharacterState } from "@temper/game-characters-character/build-types"
import { FolderOpen, Search } from "lucide-react"
import { useCallback, useMemo } from "react"
import { CharacterListCardWithHandle } from "@/components/characters/character-list-card-with-handle"
import {
  type FilterValues,
  getClassName,
  getRaceName,
  isValidRole,
  type TabValue,
} from "@/components/characters/characters-filter-types"
import { NewCharacterButton } from "@/components/characters/new-character-button"
import { NewCharacterPanelCard } from "@/components/characters/new-character-panel-card"

export interface DecodedBuild {
  id: string
  userId: string
  visibility: string
  createdAt: number
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

        if (isValidRole(dRole) && !buildData.character?.roles?.includes(dRole)) {
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
              <EmptyTitle>{tab === "build" ? "No builds yet" : "No builds found"}</EmptyTitle>
              <EmptyDescription>
                {tab === "build"
                  ? "Create your first build to plan your stats and optimize your potential."
                  : "Public builds shared by other players will appear here."}
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
              <EmptyTitle>No matching builds</EmptyTitle>
              <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="secondary" size="sm" onClick={onClearFilters}>
                Clear filters
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
      itemLabel="characters"
      initialVisibleCount={restoredVisibleCount ?? undefined}
      onVisibleCountChange={onVisibleCountChange}
      resetKey={paginationResetKey}
      trailingContent={tab === "build" && isAuthenticated ? <NewCharacterPanelCard /> : undefined}
    />
  )
}
