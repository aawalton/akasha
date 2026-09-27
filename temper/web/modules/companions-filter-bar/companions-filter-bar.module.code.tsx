"use client"

import { requireFirst } from "akasha/code/type/narrowing/modules/require-first/require-first.module.code.ts"
import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import { AddFilterButton } from "akasha/design/interface/pattern/modules/add-filter-button/add-filter-button.module.code.tsx"
import { addFilterId } from "akasha/design/interface/pattern/modules/add-filter-id/add-filter-id.module.code.ts"
import { FilterButton } from "akasha/design/interface/pattern/modules/filter-button/filter-button.module.code.tsx"
import { FilterGroup } from "akasha/design/interface/pattern/modules/filter-group/filter-group.module.code.tsx"
import { SearchButton } from "akasha/design/interface/pattern/modules/search-button/search-button.module.code.tsx"
import { SearchSortFilterRow } from "akasha/design/interface/pattern/modules/search-sort-filter-row/search-sort-filter-row.module.code.tsx"
import { SortButton } from "akasha/design/interface/pattern/modules/sort-button/sort-button.module.code.tsx"
import type {
  SortDirection,
  SortOption,
} from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import { companionBaseRoles } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import { companions } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
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
import { companionsFilterBarCompanion } from "akasha/temper/web/phrase/pages/companions-filter-bar-companion.temper-web-phrase.ts"
import { companionsFilterBarName } from "akasha/temper/web/phrase/pages/companions-filter-bar-name.temper-web-phrase.ts"
import { companionsFilterBarRecent } from "akasha/temper/web/phrase/pages/companions-filter-bar-recent.temper-web-phrase.ts"
import { companionsFilterBarRole } from "akasha/temper/web/phrase/pages/companions-filter-bar-role.temper-web-phrase.ts"
import { companionsFilterBarScore } from "akasha/temper/web/phrase/pages/companions-filter-bar-score.temper-web-phrase.ts"
import { companionsFilterBarSearch } from "akasha/temper/web/phrase/pages/companions-filter-bar-search.temper-web-phrase.ts"
import { useEffect, useState } from "react"

export type SortField = "updated" | "name" | "score"

type FilterId = "role" | "target-armor" | "target-count" | "target-health" | "companion"
const FILTER_IDS: ReadonlySet<string> = new Set<FilterId>([
  "role",
  "target-armor",
  "target-count",
  "target-health",
  "companion",
])
function isFilterId(id: string): id is FilterId {
  return FILTER_IDS.has(id)
}

interface FilterPopoverProps {
  selectedRoles: readonly string[]
  onRolesChange: (value: readonly string[]) => void
  selectedCompanion: string | null
  onCompanionChange: (value: string | null) => void
  selectedTargetArmor: string | null
  onTargetArmorChange: (value: string | null) => void
  selectedTargetCount: string | null
  onTargetCountChange: (value: string | null) => void
  selectedTargetHealth: string | null
  onTargetHealthChange: (value: string | null) => void
  phrase: Phrase
}

interface CompanionFilterDef {
  id: FilterId
  label: { readonly slug: string }
  hasValue: (props: FilterPopoverProps) => boolean
  available?: (props: FilterPopoverProps) => boolean
  clearValue: (props: FilterPopoverProps) => void
  renderGroup: (props: FilterPopoverProps) => React.ReactNode
}

function roleItems(): BadgeToggleGroupItem[] {
  return companionBaseRoles().map((role) => ({ value: role.id, label: role.name }))
}

function companionItems(): BadgeToggleGroupItem[] {
  return companions()
    .list.filter((companion) => companion.id !== "no-companion")
    .map((companion) => ({ value: companion.id, label: requireFirst(companion.name.split(" ")) }))
}

function sortOptions(phrase: Phrase): SortOption<SortField>[] {
  return [
    { value: "updated", label: phrase(companionsFilterBarRecent.slug), defaultDirection: "desc" },
    { value: "name", label: phrase(companionsFilterBarName.slug), defaultDirection: "asc" },
    { value: "score", label: phrase(companionsFilterBarScore.slug), defaultDirection: "desc" },
  ]
}

const hasDps = (props: FilterPopoverProps) => props.selectedRoles.includes("dps")

const COMPANION_FILTERS: CompanionFilterDef[] = [
  {
    id: "role",
    label: companionsFilterBarRole,
    hasValue: (props) => props.selectedRoles.length > 0,
    clearValue: (props) => props.onRolesChange([]),
    renderGroup: (props) => {
      const handleSelect = (items: readonly BadgeToggleGroupItem[]) => {
        props.onRolesChange(items.map((item) => item.value))
      }
      return (
        <BadgeToggleGroup
          items={roleItems()}
          value={props.selectedRoles.map((r) => ({ value: r, label: "" }))}
          onSelect={handleSelect}
          unselectedVariant="elevation-muted"
        />
      )
    },
  },
  {
    id: "target-armor",
    label: TARGET_FILTER_LABELS["target-armor"],
    available: hasDps,
    hasValue: (props) => props.selectedTargetArmor !== null,
    clearValue: (props) => props.onTargetArmorChange(null),
    renderGroup: (props) => {
      const handleSelect = (items: readonly BadgeToggleGroupItem[]) => {
        if (items.length === 0) {
          props.onTargetArmorChange(null)
        } else {
          const newItem = items.find((item) => item.value !== props.selectedTargetArmor)
          props.onTargetArmorChange(newItem?.value ?? null)
        }
      }
      return (
        <BadgeToggleGroup
          items={targetArmorItems()}
          value={
            props.selectedTargetArmor != null
              ? [{ value: props.selectedTargetArmor, label: "" }]
              : []
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
    available: hasDps,
    hasValue: (props) => props.selectedTargetCount !== null,
    clearValue: (props) => props.onTargetCountChange(null),
    renderGroup: (props) => {
      const handleSelect = (items: readonly BadgeToggleGroupItem[]) => {
        if (items.length === 0) {
          props.onTargetCountChange(null)
        } else {
          const newItem = items.find((item) => item.value !== props.selectedTargetCount)
          props.onTargetCountChange(newItem?.value ?? null)
        }
      }
      return (
        <BadgeToggleGroup
          items={targetCountItems(props.phrase)}
          value={
            props.selectedTargetCount != null
              ? [{ value: props.selectedTargetCount, label: "" }]
              : []
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
    available: hasDps,
    hasValue: (props) => props.selectedTargetHealth !== null,
    clearValue: (props) => props.onTargetHealthChange(null),
    renderGroup: (props) => {
      const handleSelect = (items: readonly BadgeToggleGroupItem[]) => {
        if (items.length === 0) {
          props.onTargetHealthChange(null)
        } else {
          const newItem = items.find((item) => item.value !== props.selectedTargetHealth)
          props.onTargetHealthChange(newItem?.value ?? null)
        }
      }
      return (
        <BadgeToggleGroup
          items={targetHealthItems(props.phrase)}
          value={
            props.selectedTargetHealth != null
              ? [{ value: props.selectedTargetHealth, label: "" }]
              : []
          }
          onSelect={handleSelect}
          unselectedVariant="elevation-muted"
        />
      )
    },
  },
  {
    id: "companion",
    label: companionsFilterBarCompanion,
    hasValue: (props) => props.selectedCompanion !== null,
    clearValue: (props) => props.onCompanionChange(null),
    renderGroup: (props) => {
      const handleSelect = (items: readonly BadgeToggleGroupItem[]) => {
        if (items.length === 0) {
          props.onCompanionChange(null)
        } else {
          const newItem = items.find((item) => item.value !== props.selectedCompanion)
          props.onCompanionChange(newItem?.value ?? null)
        }
      }
      return (
        <BadgeToggleGroup
          items={companionItems()}
          value={
            props.selectedCompanion != null ? [{ value: props.selectedCompanion, label: "" }] : []
          }
          onSelect={handleSelect}
          unselectedVariant="elevation-muted"
          wrap
        />
      )
    },
  },
]

interface CompanionsFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  selectedRoles: readonly string[]
  onRolesChange: (value: readonly string[]) => void
  selectedCompanion: string | null
  onCompanionChange: (value: string | null) => void
  selectedTargetArmor: string | null
  onTargetArmorChange: (value: string | null) => void
  selectedTargetCount: string | null
  onTargetCountChange: (value: string | null) => void
  selectedTargetHealth: string | null
  onTargetHealthChange: (value: string | null) => void
  sortBy: SortField
  sortDirection: SortDirection
  onSortChange: (field: SortField, direction: SortDirection) => void
  hasActiveFilters: boolean
  onReset: () => void
}

export function CompanionsFilterBar({
  search,
  onSearchChange,
  selectedRoles,
  onRolesChange,
  selectedCompanion,
  onCompanionChange,
  selectedTargetArmor,
  onTargetArmorChange,
  selectedTargetCount,
  onTargetCountChange,
  selectedTargetHealth,
  onTargetHealthChange,
  sortBy,
  sortDirection,
  onSortChange,
  hasActiveFilters,
  onReset,
}: CompanionsFilterBarProps) {
  const phrase = usePhrase()
  const popoverProps: FilterPopoverProps = {
    phrase,
    selectedRoles,
    onRolesChange,
    selectedCompanion,
    onCompanionChange,
    selectedTargetArmor,
    onTargetArmorChange,
    selectedTargetCount,
    onTargetCountChange,
    selectedTargetHealth,
    onTargetHealthChange,
  }

  const [addedFilters, setAddedFilters] = useState<Set<FilterId>>(() => {
    const initial = new Set<FilterId>()
    for (const f of COMPANION_FILTERS) {
      if (f.hasValue(popoverProps)) initial.add(f.id)
    }
    return initial
  })

  useEffect(() => {
    const unavailable = COMPANION_FILTERS.filter(
      (f) => f.available !== undefined && !f.available(popoverProps)
    )
    if (unavailable.length === 0) return

    let didRemove = false
    for (const f of unavailable) {
      if (addedFilters.has(f.id)) {
        f.clearValue(popoverProps)
        didRemove = true
      }
    }

    if (didRemove) {
      setAddedFilters((prev) => {
        const next = new Set(prev)
        for (const f of unavailable) next.delete(f.id)
        return next
      })
    }
  }, [selectedRoles])

  const visibleFilters = COMPANION_FILTERS.filter(
    (f) =>
      (addedFilters.has(f.id) || f.hasValue(popoverProps)) &&
      (f.available === undefined || f.available(popoverProps))
  )

  const availableFilters = COMPANION_FILTERS.filter(
    (f) =>
      !addedFilters.has(f.id) &&
      !f.hasValue(popoverProps) &&
      (f.available === undefined || f.available(popoverProps))
  )

  function handleAdd(id: string) {
    addFilterId(id, isFilterId, setAddedFilters)
  }

  function handleRemove(id: FilterId) {
    const filterDef = COMPANION_FILTERS.find((f) => f.id === id)
    if (filterDef) filterDef.clearValue(popoverProps)
    setAddedFilters((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const hasActivePopoverFilters =
    selectedRoles.length > 0 ||
    selectedCompanion !== null ||
    selectedTargetArmor !== null ||
    selectedTargetCount !== null ||
    selectedTargetHealth !== null

  return (
    <SearchSortFilterRow hasActiveFilters={hasActiveFilters} onReset={onReset}>
      <SearchButton
        value={search}
        onChange={onSearchChange}
        placeholder={phrase(companionsFilterBarSearch.slug)}
      />

      <SortButton
        options={sortOptions(phrase)}
        sorts={[{ field: sortBy, direction: sortDirection }]}
        onSortsChange={(sorts) => {
          const first = sorts[0]
          if (first) onSortChange(first.field, first.direction)
        }}
        defaultSort={{ field: "score", direction: "desc" }}
      />

      <FilterButton
        hasActiveFilters={hasActivePopoverFilters || addedFilters.size > 0}
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
              {filterDef.renderGroup(popoverProps)}
            </FilterGroup>
          ))}
          <AddFilterButton
            options={availableFilters.map((f) => ({ id: f.id, label: phrase(f.label.slug) }))}
            onAdd={handleAdd}
          />
        </div>
      </FilterButton>
    </SearchSortFilterRow>
  )
}
