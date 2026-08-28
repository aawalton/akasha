"use client"

import { BadgeToggleGroup, type BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { PanelToggleProvider } from "@shared/design-layout/components/panel-toggle-provider"
import { AddFilterButton } from "@shared/design-patterns/components/add-filter-button"
import { FilterButton } from "@shared/design-patterns/components/filter-button"
import { FilterGroup } from "@shared/design-patterns/components/filter-group"
import { SearchSortFilterRow } from "@shared/design-patterns/components/search-sort-filter-row"
import { TabsContent } from "@shared/design-patterns/components/tabs"
import type { Build, ComboRankingsMap } from "@temper/game-companions-core/companion-leaderboard"
import { useCallback, useState } from "react"
import { CompanionLeaderboardContent } from "@/components/companions/companion-leaderboard-content"
import {
  LEADERBOARD_TARGET_ARMOR_ITEMS,
  LEADERBOARD_TARGET_COUNT_ITEMS,
  LEADERBOARD_TARGET_HEALTH_ITEMS,
} from "@/components/companions/companions-filter-types"

type FilterId = "target-armor" | "target-count" | "target-health"
const FILTER_IDS: ReadonlySet<string> = new Set<FilterId>([
  "target-armor",
  "target-count",
  "target-health",
])
function isFilterId(id: string): id is FilterId {
  return FILTER_IDS.has(id)
}

interface FilterDef {
  id: FilterId
  label: string
  hasValue: (props: CompanionsLeaderboardTabProps) => boolean
  renderGroup: (props: CompanionsLeaderboardTabProps) => React.ReactNode
}

const LEADERBOARD_FILTERS: FilterDef[] = [
  {
    id: "target-armor",
    label: "Target Armor",
    hasValue: ({ leaderboardTargetArmor }) => leaderboardTargetArmor !== null,
    renderGroup: ({ leaderboardTargetArmor, onLeaderboardFilterChange }) => {
      function handleSelect(items: readonly BadgeToggleGroupItem[]) {
        if (items.length === 0) {
          onLeaderboardFilterChange({ leaderboardTargetArmor: null })
        } else {
          const newItem = items.find((item) => item.value !== leaderboardTargetArmor)
          onLeaderboardFilterChange({ leaderboardTargetArmor: newItem?.value ?? null })
        }
      }
      return (
        <BadgeToggleGroup
          items={LEADERBOARD_TARGET_ARMOR_ITEMS}
          value={
            leaderboardTargetArmor != null ? [{ value: leaderboardTargetArmor, label: "" }] : []
          }
          onSelect={handleSelect}
          unselectedVariant="elevation-muted"
        />
      )
    },
  },
  {
    id: "target-count",
    label: "Target Count",
    hasValue: ({ leaderboardTargetCount }) => leaderboardTargetCount !== null,
    renderGroup: ({ leaderboardTargetCount, onLeaderboardFilterChange }) => {
      function handleSelect(items: readonly BadgeToggleGroupItem[]) {
        if (items.length === 0) {
          onLeaderboardFilterChange({ leaderboardTargetCount: null })
        } else {
          const newItem = items.find((item) => item.value !== leaderboardTargetCount)
          onLeaderboardFilterChange({ leaderboardTargetCount: newItem?.value ?? null })
        }
      }
      return (
        <BadgeToggleGroup
          items={LEADERBOARD_TARGET_COUNT_ITEMS}
          value={
            leaderboardTargetCount != null ? [{ value: leaderboardTargetCount, label: "" }] : []
          }
          onSelect={handleSelect}
          unselectedVariant="elevation-muted"
        />
      )
    },
  },
  {
    id: "target-health",
    label: "Target Health",
    hasValue: ({ leaderboardTargetHealth }) => leaderboardTargetHealth !== null,
    renderGroup: ({ leaderboardTargetHealth, onLeaderboardFilterChange }) => {
      function handleSelect(items: readonly BadgeToggleGroupItem[]) {
        if (items.length === 0) {
          onLeaderboardFilterChange({ leaderboardTargetHealth: null })
        } else {
          const newItem = items.find((item) => item.value !== leaderboardTargetHealth)
          onLeaderboardFilterChange({ leaderboardTargetHealth: newItem?.value ?? null })
        }
      }
      return (
        <BadgeToggleGroup
          items={LEADERBOARD_TARGET_HEALTH_ITEMS}
          value={
            leaderboardTargetHealth != null ? [{ value: leaderboardTargetHealth, label: "" }] : []
          }
          onSelect={handleSelect}
          unselectedVariant="elevation-muted"
        />
      )
    },
  },
]

interface CompanionsLeaderboardTabProps {
  active: boolean
  builds: readonly Build[]
  rankingsMap: ComboRankingsMap
  leaderboardTargetArmor: string | null
  leaderboardTargetCount: string | null
  leaderboardTargetHealth: string | null
  onLeaderboardFilterChange: (values: {
    leaderboardTargetArmor?: string | null
    leaderboardTargetCount?: string | null
    leaderboardTargetHealth?: string | null
  }) => void
}

export function CompanionsLeaderboardTab({
  active,
  builds,
  rankingsMap,
  leaderboardTargetArmor,
  leaderboardTargetCount,
  leaderboardTargetHealth,
  onLeaderboardFilterChange,
}: CompanionsLeaderboardTabProps) {
  const props: CompanionsLeaderboardTabProps = {
    active,
    builds,
    rankingsMap,
    leaderboardTargetArmor,
    leaderboardTargetCount,
    leaderboardTargetHealth,
    onLeaderboardFilterChange,
  }

  const [addedFilters, setAddedFilters] = useState<Set<FilterId>>(() => {
    const initial = new Set<FilterId>()
    for (const f of LEADERBOARD_FILTERS) {
      if (f.hasValue(props)) initial.add(f.id)
    }
    return initial
  })

  const visibleFilters = LEADERBOARD_FILTERS.filter(
    (f) => addedFilters.has(f.id) || f.hasValue(props)
  )

  const availableFilters = LEADERBOARD_FILTERS.filter(
    (f) => !addedFilters.has(f.id) && !f.hasValue(props)
  )

  function handleAdd(id: string) {
    if (!isFilterId(id)) return
    setAddedFilters((prev) => new Set(prev).add(id))
  }

  function handleRemove(id: FilterId) {
    if (id === "target-armor") {
      onLeaderboardFilterChange({ leaderboardTargetArmor: null })
    } else if (id === "target-count") {
      onLeaderboardFilterChange({ leaderboardTargetCount: null })
    } else if (id === "target-health") {
      onLeaderboardFilterChange({ leaderboardTargetHealth: null })
    }
    setAddedFilters((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const hasActiveLeaderboardFilters =
    leaderboardTargetArmor !== null ||
    leaderboardTargetCount !== null ||
    leaderboardTargetHealth !== null

  const handleResetLeaderboardFilters = useCallback(() => {
    onLeaderboardFilterChange({
      leaderboardTargetArmor: null,
      leaderboardTargetCount: null,
      leaderboardTargetHealth: null,
    })
  }, [onLeaderboardFilterChange])

  return (
    <TabsContent value="leaderboard">
      <PanelToggleProvider active={active}>
        <div className="flex flex-col gap-6">
          <PageTabHeader title="Rank">
            <SearchSortFilterRow
              hasActiveFilters={hasActiveLeaderboardFilters}
              onReset={handleResetLeaderboardFilters}
            >
              <FilterButton
                hasActiveFilters={hasActiveLeaderboardFilters}
                popoverClassName="max-w-panel"
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
                      {filterDef.renderGroup(props)}
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
          <CompanionLeaderboardContent builds={builds} rankingsMap={rankingsMap} />
        </div>
      </PanelToggleProvider>
    </TabsContent>
  )
}
