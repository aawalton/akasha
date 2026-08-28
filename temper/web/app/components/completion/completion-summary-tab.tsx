"use client"

import { BadgeToggleGroup } from "@shared/design-badges/components/badge-toggle-group"
import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { PanelToggleProvider } from "@shared/design-layout/components/panel-toggle-provider"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import { AddFilterButton } from "@shared/design-patterns/components/add-filter-button"
import { FilterButton } from "@shared/design-patterns/components/filter-button"
import { FilterGroup } from "@shared/design-patterns/components/filter-group"
import { SearchButton } from "@shared/design-patterns/components/search-button"
import { SearchSortFilterRow } from "@shared/design-patterns/components/search-sort-filter-row"
import { SortButton } from "@shared/design-patterns/components/sort-button"
import { TabsContent } from "@shared/design-patterns/components/tabs"
import { useState } from "react"
import { AccountSummaryPanelCard } from "@/components/completion/account-summary-panel-card"
import { CharactersSummaryPanelCard } from "@/components/completion/characters-summary-panel-card"
import { CompanionsSummaryPanelCard } from "@/components/completion/companions-summary-panel-card"
import type { AccountSummaryData, CharacterSummaryData, CompanionSummaryData } from "@temper/player-completion/completion-card-registry"
import { useCompletionToolbar } from "@/components/completion/completion-toolbar-context"
import { OverallSummaryPanelCard } from "@/components/completion/overall-summary-panel-card"

type FilterId = "status"
function isFilterId(id: string): id is FilterId {
  return id === "status"
}

interface SummaryFilterDef {
  id: FilterId
  label: string
}

const SUMMARY_FILTERS: SummaryFilterDef[] = [{ id: "status", label: "Status" }]

interface CompletionSummaryTabProps {
  active: boolean
  accountSummary: AccountSummaryData
  characterSummary: CharacterSummaryData
  companionSummary: CompanionSummaryData
  onOverallClick: (key: string) => void
  onAccountSummaryClick: (key: string) => void
  onCharacterSummaryClick: (key: string) => void
  onCompanionSummaryClick: (key: string) => void
}

export function CompletionSummaryTab({
  active,
  accountSummary,
  characterSummary,
  companionSummary,
  onOverallClick,
  onAccountSummaryClick,
  onCharacterSummaryClick,
  onCompanionSummaryClick,
}: CompletionSummaryTabProps) {
  const {
    completionFilter,
    sortMode,
    sortDirection,
    sortOptions,
    search,
    selectedStatus,
    statusItems,
    hasActiveFilters,
    onReset,
    onStatusSelect,
    onSortChange,
    onSearchChange,
  } = useCompletionToolbar()

  const [addedFilters, setAddedFilters] = useState<Set<FilterId>>(() => {
    const initial = new Set<FilterId>()
    if (selectedStatus.length > 0) initial.add("status")
    return initial
  })

  const hasStatusValue = selectedStatus.length > 0

  const visibleFilters = SUMMARY_FILTERS.filter(
    (f) => addedFilters.has(f.id) || (f.id === "status" && hasStatusValue)
  )

  const availableFilters = SUMMARY_FILTERS.filter(
    (f) => !addedFilters.has(f.id) && !(f.id === "status" && hasStatusValue)
  )

  function handleAdd(id: string) {
    if (!isFilterId(id)) return
    setAddedFilters((prev) => new Set(prev).add(id))
  }

  function handleRemove(id: FilterId) {
    if (id === "status") {
      onStatusSelect([])
    }
    setAddedFilters((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  return (
    <TabsContent value="summary">
      <PanelToggleProvider active={active}>
        <div className="flex flex-col gap-6">
          <PageTabHeader title="Summary">
            <SearchSortFilterRow hasActiveFilters={hasActiveFilters} onReset={onReset}>
              <SearchButton value={search} onChange={onSearchChange} placeholder="Search..." />
              <SortButton
                options={sortOptions}
                sorts={[{ field: sortMode, direction: sortDirection }]}
                onSortsChange={(sorts) => {
                  const first = sorts[0]
                  if (first) onSortChange(first.field, first.direction)
                }}
                defaultSort={{ field: "status", direction: "asc" }}
              />
              <FilterButton
                hasActiveFilters={hasStatusValue || addedFilters.size > 0}
                emptySelectOptions={availableFilters.map((f) => ({ id: f.id, label: f.label }))}
                onEmptySelect={handleAdd}
              >
                <div className="flex flex-col gap-3">
                  {visibleFilters.map((filterDef) => (
                    <FilterGroup
                      key={filterDef.id}
                      label={filterDef.label}
                      onRemove={() => handleRemove(filterDef.id)}
                    >
                      {filterDef.id === "status" && (
                        <BadgeToggleGroup
                          items={statusItems}
                          value={selectedStatus}
                          onSelect={onStatusSelect}
                          unselectedVariant="elevation-muted"
                          wrap
                        />
                      )}
                    </FilterGroup>
                  ))}
                  <AddFilterButton
                    options={availableFilters.map((f) => ({ id: f.id, label: f.label }))}
                    onAdd={handleAdd}
                  />
                </div>
              </FilterButton>
            </SearchSortFilterRow>
          </PageTabHeader>
          <ResponsiveColumns hasSummaryPanel>
            <OverallSummaryPanelCard
              accountSummary={accountSummary}
              characterSummary={characterSummary}
              companionSummary={companionSummary}
              completionFilter={completionFilter}
              sortMode={sortMode}
              sortDirection={sortDirection}
              onItemClick={onOverallClick}
              collapseProtected
            />
            <AccountSummaryPanelCard
              summary={accountSummary}
              completionFilter={completionFilter}
              sortMode={sortMode}
              sortDirection={sortDirection}
              onItemClick={onAccountSummaryClick}
            />
            <CharactersSummaryPanelCard
              summary={characterSummary}
              completionFilter={completionFilter}
              sortMode={sortMode}
              sortDirection={sortDirection}
              onItemClick={onCharacterSummaryClick}
            />
            <CompanionsSummaryPanelCard
              summary={companionSummary}
              completionFilter={completionFilter}
              sortMode={sortMode}
              sortDirection={sortDirection}
              onItemClick={onCompanionSummaryClick}
            />
          </ResponsiveColumns>
        </div>
      </PanelToggleProvider>
    </TabsContent>
  )
}
