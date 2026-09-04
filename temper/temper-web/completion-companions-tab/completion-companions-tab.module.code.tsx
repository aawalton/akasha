"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "@akasha/design-badges/badge-toggle-group"
import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { PanelToggleProvider } from "@akasha/design-layout/panel-toggle-provider"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { AddFilterButton } from "@akasha/design-patterns/add-filter-button"
import { FilterButton } from "@akasha/design-patterns/filter-button"
import { FilterGroup } from "@akasha/design-patterns/filter-group"
import { SearchButton } from "@akasha/design-patterns/search-button"
import { SearchSortFilterRow } from "@akasha/design-patterns/search-sort-filter-row"
import { SortButton } from "@akasha/design-patterns/sort-button"
import { TabsContent } from "@akasha/design-patterns/tabs"
import type { CompanionSummaryData } from "@akasha/temper-player-completion/completion-card-registry"
import { buildCompanionSummary } from "@akasha/temper-player-completion/completion-summary-companion"
import { useMemo, useState } from "react"
import { CompanionLevelPanelCard } from "../companion-level-panel-card/companion-level-panel-card.module.code.tsx"
import type { CompanionProgressData } from "../companion-progress/companion-progress.module.code.ts"
import { CompanionQuestsUnionPanelCard } from "../companion-quests-union-panel-card/companion-quests-union-panel-card.module.code.tsx"
import { CompanionRapportPanelCard } from "../companion-rapport-panel-card/companion-rapport-panel-card.module.code.tsx"
import { CompanionSkillLinesProgressPanelCard } from "../companion-skill-lines-progress-panel-card/companion-skill-lines-progress-panel-card.module.code.tsx"
import { CompanionsSummaryPanelCard } from "../companions-summary-panel-card/companions-summary-panel-card.module.code.tsx"
import { useCompletionToolbar } from "../completion-toolbar-context/completion-toolbar-context.module.code.tsx"

type FilterId = "status" | "companion"
const FILTER_IDS: ReadonlySet<string> = new Set<FilterId>(["status", "companion"])
function isFilterId(id: string): id is FilterId {
  return FILTER_IDS.has(id)
}

interface CompanionsFilterDef {
  id: FilterId
  label: string
}

const COMPANIONS_FILTERS: CompanionsFilterDef[] = [
  { id: "status", label: "Status" },
  { id: "companion", label: "Companion" },
]

interface CompletionCompanionsTabProps {
  active: boolean
  companion: string | null
  onCompanionChange: (value: string | null) => void
  onCompanionSummaryClick: (key: string) => void
  companionSummary: CompanionSummaryData
  companionProgressData: CompanionProgressData
}

export function CompletionCompanionsTab({
  active,
  companion,
  onCompanionChange,
  onCompanionSummaryClick,
  companionSummary,
  companionProgressData,
}: CompletionCompanionsTabProps) {
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

  const { companionProgress, companionSkillLineProgress, companionQuestUnion } =
    companionProgressData

  const companionItems: BadgeToggleGroupItem[] = useMemo(
    () =>
      companionProgress
        .map((c) => ({ value: c.companionId, label: c.name }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [companionProgress]
  )

  const selectedCompanion = useMemo(() => {
    if (companion == null) return null
    return companionItems.find((c) => c.value === companion) ?? null
  }, [companion, companionItems])

  const handleCompanionSelect = (items: readonly BadgeToggleGroupItem[]) => {
    const newItem = items.find((item) => item.value !== companion)
    onCompanionChange(newItem?.value ?? null)
  }

  const selectedCompanionIds = useMemo(
    () => (selectedCompanion ? [selectedCompanion.value] : []),
    [selectedCompanion]
  )

  const filteredCompanionSummary = useMemo(() => {
    if (!selectedCompanion) return companionSummary
    return buildCompanionSummary(
      companionProgress,
      companionSkillLineProgress,
      companionQuestUnion,
      [selectedCompanion.value]
    )
  }, [
    selectedCompanion,
    companionSummary,
    companionProgress,
    companionSkillLineProgress,
    companionQuestUnion,
  ])

  const leveledCompanionCount = companionProgress.filter((c) => c.level !== undefined).length
  const unleveledCompanionCount = companionProgress.length - leveledCompanionCount

  const hasStatusValue = selectedStatus.length > 0
  const hasCompanionValue = selectedCompanion !== null

  const [addedFilters, setAddedFilters] = useState<Set<FilterId>>(() => {
    const initial = new Set<FilterId>()
    if (hasStatusValue) initial.add("status")
    if (hasCompanionValue) initial.add("companion")
    return initial
  })

  const visibleFilters = COMPANIONS_FILTERS.filter(
    (f) =>
      addedFilters.has(f.id) ||
      (f.id === "status" && hasStatusValue) ||
      (f.id === "companion" && hasCompanionValue)
  )

  const availableFilters = COMPANIONS_FILTERS.filter(
    (f) =>
      !addedFilters.has(f.id) &&
      !(f.id === "status" && hasStatusValue) &&
      !(f.id === "companion" && hasCompanionValue)
  )

  function handleAdd(id: string) {
    if (!isFilterId(id)) return
    setAddedFilters((prev) => new Set(prev).add(id))
  }

  function handleRemove(id: FilterId) {
    if (id === "status") {
      onStatusSelect([])
    } else if (id === "companion") {
      onCompanionChange(null)
    }
    setAddedFilters((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  return (
    <TabsContent value="companions">
      <PanelToggleProvider active={active}>
        <div className="flex flex-col gap-6">
          <PageTabHeader title={selectedCompanion?.label ?? "All Companions"}>
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
                hasActiveFilters={hasCompanionValue || hasStatusValue || addedFilters.size > 0}
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
                      {filterDef.id === "companion" && (
                        <BadgeToggleGroup
                          items={companionItems}
                          value={selectedCompanion ? [selectedCompanion] : []}
                          onSelect={handleCompanionSelect}
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
          {unleveledCompanionCount > 0 && (
            <p className="text-secondary text-sm">
              Companion levels have synced for {leveledCompanionCount} of {companionProgress.length}{" "}
              companions. The {unleveledCompanionCount} not yet synced{" "}
              {unleveledCompanionCount === 1 ? "is" : "are"} excluded from Companion Level, not
              counted as zero.
            </p>
          )}
          <ResponsiveColumns hasSummaryPanel>
            <CompanionsSummaryPanelCard
              summary={filteredCompanionSummary}
              completionFilter={completionFilter}
              sortMode={sortMode}
              sortDirection={sortDirection}
              onItemClick={onCompanionSummaryClick}
              collapseProtected
            />
            <CompanionLevelPanelCard
              id="companion-level"
              companionProgress={companionProgress}
              selectedCompanionIds={selectedCompanionIds}
              completionFilter={completionFilter}
              sortMode={sortMode}
              sortDirection={sortDirection}
            />
            <CompanionQuestsUnionPanelCard
              id="companion-quests-union"
              questUnion={companionQuestUnion}
              completionFilter={completionFilter}
              sortMode={sortMode}
              sortDirection={sortDirection}
            />
            <CompanionRapportPanelCard
              id="companion-rapport"
              companionProgress={companionProgress}
              selectedCompanionIds={selectedCompanionIds}
              completionFilter={completionFilter}
              sortMode={sortMode}
              sortDirection={sortDirection}
            />
            <CompanionSkillLinesProgressPanelCard
              id="companion-skill-lines"
              companionSkillLineProgress={companionSkillLineProgress}
              selectedCompanionIds={selectedCompanionIds}
              completionFilter={completionFilter}
              sortMode={sortMode}
              sortDirection={sortDirection}
            />
          </ResponsiveColumns>
        </div>
      </PanelToggleProvider>
    </TabsContent>
  )
}
