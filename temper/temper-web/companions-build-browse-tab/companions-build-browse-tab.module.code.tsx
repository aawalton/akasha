"use client"

import { Badge } from "@akasha/design-badges/badge"
import { PageTabHeader, PageTabTitleBadges } from "@akasha/design-layout/page-tab-header"
import { PaginatedCardGrid } from "@akasha/design-layout/paginated-card-grid"
import { PanelToggleProvider } from "@akasha/design-layout/panel-toggle-provider"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { TabsContent } from "@akasha/design-patterns/tabs"
import { Button } from "@akasha/design-primitives/button"
import { Card, CardContent } from "@akasha/design-primitives/card"
import { getCompanionName } from "@akasha/temper-companions-core/companions"
import { FolderOpen, Search } from "lucide-react"
import { type ReactNode, useCallback, useMemo } from "react"
import { CompanionListCardWithHandle } from "../companion-list-card-with-handle/companion-list-card-with-handle.module.code.tsx"
import {
  CompanionsFilterBar,
  type SortField,
} from "../companions-filter-bar/companions-filter-bar.module.code.tsx"
import type { FilterValues } from "../companions-filter-types/companions-filter-types.module.code.ts"
import { NewCompanionButton } from "../new-companion-button/new-companion-button.module.code.tsx"
import { NewCompanionPanelCard } from "../new-companion-panel-card/new-companion-panel-card.module.code.tsx"
import type { useFilteredBuilds } from "../use-filtered-builds/use-filtered-builds.module.code.ts"

interface CompanionsBuildBrowseTabProps {
  active: boolean
  tab: "build" | "browse"
  isAuthenticated: boolean
  userId: string | null
  values: FilterValues
  update: (values: Partial<FilterValues>, options?: { push?: boolean }) => void
  filteredBuilds: ReturnType<typeof useFilteredBuilds>
  initialVisibleCount: number | undefined
  onVisibleCountChange: (count: number) => void
}

export function CompanionsBuildBrowseTab({
  active,
  tab,
  isAuthenticated,
  userId,
  values,
  update,
  filteredBuilds,
  initialVisibleCount,
  onVisibleCountChange,
}: CompanionsBuildBrowseTabProps) {
  const {
    search,
    roles: selectedRoles,
    companion: selectedCompanion,
    targetArmor: selectedTargetArmor,
    targetCount: selectedTargetCount,
    targetHealth: selectedTargetHealth,
    sortBy,
    sortDirection,
  } = values

  const handleSearchChange = (value: string) => update({ search: value })

  const handleRolesChange = (newRoles: readonly string[]) => {
    const roleSort: SortField | null = newRoles.length > 0 ? "score" : null
    const newSort = roleSort ?? sortBy
    const newDirection: SortDirection = roleSort != null ? "desc" : sortDirection

    if (
      !newRoles.includes("dps") &&
      (selectedTargetArmor !== null ||
        selectedTargetCount !== null ||
        selectedTargetHealth !== null)
    ) {
      update({
        roles: newRoles,
        targetArmor: null,
        targetCount: null,
        targetHealth: null,
        sortBy: newSort,
        sortDirection: newDirection,
      })
    } else {
      update({
        roles: newRoles,
        ...(roleSort != null ? { sortBy: newSort, sortDirection: newDirection } : {}),
      })
    }
  }

  const handleCompanionChange = (value: string | null) => update({ companion: value })
  const handleTargetArmorChange = (value: string | null) => update({ targetArmor: value })
  const handleTargetCountChange = (value: string | null) => update({ targetCount: value })
  const handleTargetHealthChange = (value: string | null) => update({ targetHealth: value })

  const handleSortChange = (newSort: SortField, newDirection: SortDirection) =>
    update({ sortBy: newSort, sortDirection: newDirection })

  const hasActiveFilters =
    search.length > 0 ||
    selectedRoles.length > 0 ||
    selectedCompanion !== null ||
    selectedTargetArmor !== null ||
    selectedTargetCount !== null ||
    selectedTargetHealth !== null ||
    sortBy !== "score" ||
    sortDirection !== "desc"

  const clearAllFilters = () =>
    update({
      search: "",
      roles: [],
      companion: null,
      targetArmor: null,
      targetCount: null,
      targetHealth: null,
      sortBy: "score",
      sortDirection: "desc",
    })

  const renderCompanionCard = useCallback(
    (build: (typeof filteredBuilds)[number]) => (
      <CompanionListCardWithHandle
        key={build.id}
        build={build}
        getCompanionName={getCompanionName}
        currentUserId={userId}
      />
    ),
    [userId]
  )

  const filterBar = (
    <CompanionsFilterBar
      search={search}
      onSearchChange={handleSearchChange}
      selectedRoles={selectedRoles}
      onRolesChange={handleRolesChange}
      selectedCompanion={selectedCompanion}
      onCompanionChange={handleCompanionChange}
      selectedTargetArmor={selectedTargetArmor}
      onTargetArmorChange={handleTargetArmorChange}
      selectedTargetCount={selectedTargetCount}
      onTargetCountChange={handleTargetCountChange}
      selectedTargetHealth={selectedTargetHealth}
      onTargetHealthChange={handleTargetHealthChange}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSortChange={handleSortChange}
      hasActiveFilters={hasActiveFilters}
      onReset={clearAllFilters}
    />
  )

  const emptyNoFilters = (
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
                ? "Create your first build to optimize your companion\u2019s gear and skills."
                : "Public companions shared by other players will appear here."}
            </EmptyDescription>
          </EmptyHeader>
          {tab === "build" && isAuthenticated && (
            <EmptyContent>
              <NewCompanionButton />
            </EmptyContent>
          )}
        </Empty>
      </CardContent>
    </Card>
  )

  const emptyWithFilters = (
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
            <Button variant="secondary" size="sm" onClick={clearAllFilters}>
              Clear filters
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )

  const badge =
    filteredBuilds.length > 0 ? (
      <PageTabTitleBadges>
        <Badge variant="elevation-muted">{filteredBuilds.length}</Badge>
      </PageTabTitleBadges>
    ) : undefined

  const title = tab === "build" ? "Build" : "Browse"

  const trailingContent: ReactNode =
    tab === "build" && isAuthenticated ? <NewCompanionPanelCard /> : undefined

  const resetKey = useMemo(() => JSON.stringify({ values, tab }), [values, tab])

  return (
    <TabsContent value={tab}>
      <PanelToggleProvider active={active}>
        <div className="flex flex-col gap-6">
          <PageTabHeader title={title} titleTrailing={badge}>
            {filterBar}
          </PageTabHeader>
          {filteredBuilds.length === 0 && !hasActiveFilters && emptyNoFilters}
          {filteredBuilds.length === 0 && hasActiveFilters && emptyWithFilters}
          {filteredBuilds.length > 0 && (
            <PaginatedCardGrid
              items={filteredBuilds}
              renderItem={renderCompanionCard}
              itemLabel="builds"
              initialVisibleCount={initialVisibleCount}
              onVisibleCountChange={onVisibleCountChange}
              resetKey={resetKey}
              trailingContent={trailingContent}
            />
          )}
        </div>
      </PanelToggleProvider>
    </TabsContent>
  )
}
