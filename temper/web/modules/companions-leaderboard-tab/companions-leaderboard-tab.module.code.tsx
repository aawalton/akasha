"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import { PageTabHeader } from "akasha/design/interface/layout/modules/page-tab-header/page-tab-header.module.code.tsx"
import { PanelToggleProvider } from "akasha/design/interface/layout/modules/panel-toggle-provider/panel-toggle-provider.module.code.tsx"
import { AddFilterButton } from "akasha/design/interface/pattern/modules/add-filter-button/add-filter-button.module.code.tsx"
import { addFilterId } from "akasha/design/interface/pattern/modules/add-filter-id/add-filter-id.module.code.ts"
import { FilterButton } from "akasha/design/interface/pattern/modules/filter-button/filter-button.module.code.tsx"
import { FilterGroup } from "akasha/design/interface/pattern/modules/filter-group/filter-group.module.code.tsx"
import { SearchSortFilterRow } from "akasha/design/interface/pattern/modules/search-sort-filter-row/search-sort-filter-row.module.code.tsx"
import { TabsContent } from "akasha/design/interface/pattern/modules/tabs/tabs.module.code.tsx"
import type {
  Build,
  ComboRankingsMap,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-leaderboard/companion-leaderboard.module.code.ts"
import { CompanionLeaderboardContent } from "akasha/temper/web/modules/companion-leaderboard-content/companion-leaderboard-content.module.code.tsx"
import {
  TARGET_FILTER_LABELS,
  targetArmorItems,
  targetCountItems,
  targetHealthItems,
} from "akasha/temper/web/modules/companions-filter-types/companions-filter-types.module.code.ts"
import {
  type Phrase,
  usePhrase,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionsLeaderboardTabRank } from "akasha/temper/web/phrase/pages/companions-leaderboard-tab-rank.temper-web-phrase.ts"
import { useCallback, useState } from "react"

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
  label: { readonly slug: string }
  hasValue: (props: CompanionsLeaderboardTabProps) => boolean
  renderGroup: (props: CompanionsLeaderboardTabProps, phrase: Phrase) => React.ReactNode
}

const LEADERBOARD_FILTERS: FilterDef[] = [
  {
    id: "target-armor",
    label: TARGET_FILTER_LABELS["target-armor"],
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
          items={targetArmorItems()}
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
    label: TARGET_FILTER_LABELS["target-count"],
    hasValue: ({ leaderboardTargetCount }) => leaderboardTargetCount !== null,
    renderGroup: ({ leaderboardTargetCount, onLeaderboardFilterChange }, phrase) => {
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
          items={targetCountItems(phrase)}
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
    label: TARGET_FILTER_LABELS["target-health"],
    hasValue: ({ leaderboardTargetHealth }) => leaderboardTargetHealth !== null,
    renderGroup: ({ leaderboardTargetHealth, onLeaderboardFilterChange }, phrase) => {
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
          items={targetHealthItems(phrase)}
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
  const phrase = usePhrase()
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
    addFilterId(id, isFilterId, setAddedFilters)
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
          <PageTabHeader title={phrase(companionsLeaderboardTabRank.slug)}>
            <SearchSortFilterRow
              hasActiveFilters={hasActiveLeaderboardFilters}
              onReset={handleResetLeaderboardFilters}
            >
              <FilterButton
                hasActiveFilters={hasActiveLeaderboardFilters}
                popoverClassName="max-w-panel"
                emptySelectOptions={availableFilters.map((f) => ({
                  id: f.id,
                  label: phrase(f.label.slug),
                }))}
                onEmptySelect={handleAdd}
              >
                <div className="flex flex-col gap-3">
                  {visibleFilters.map((filterDef) => (
                    <FilterGroup
                      key={filterDef.id}
                      label={phrase(filterDef.label.slug)}
                      onRemove={() => handleRemove(filterDef.id)}
                    >
                      {filterDef.renderGroup(props, phrase)}
                    </FilterGroup>
                  ))}
                  <AddFilterButton
                    options={availableFilters.map((f) => ({
                      id: f.id,
                      label: phrase(f.label.slug),
                    }))}
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
