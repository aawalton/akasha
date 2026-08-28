"use client"

import { BadgeToggleGroup, type BadgeToggleGroupItem } from "@shared/design-system"
import { AddFilterButton } from "@shared/design-patterns/components/add-filter-button"
import { FilterButton } from "@shared/design-patterns/components/filter-button"
import { FilterGroup } from "@shared/design-patterns/components/filter-group"
import { SearchButton } from "@shared/design-patterns/components/search-button"
import { SearchSortFilterRow } from "@shared/design-patterns/components/search-sort-filter-row"
import { SortButton } from "@shared/design-patterns/components/sort-button"
import { type SortDirection, type SortOption } from "@shared/design-patterns/utils/sort-types"
import { requireFirst } from "@shared/utils-narrow/require-first"
import { targetArmor } from "@temper/game-characters-character/target-armor-data"
import { companions } from "@temper/game-companions-core/companions-data"
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
}

interface CompanionFilterDef {
  id: FilterId
  label: string
  hasValue: (props: FilterPopoverProps) => boolean
  available?: (props: FilterPopoverProps) => boolean
  clearValue: (props: FilterPopoverProps) => void
  renderGroup: (props: FilterPopoverProps) => React.ReactNode
}

const ROLE_ITEMS: BadgeToggleGroupItem[] = [
  { value: "dps", label: "DPS" },
  { value: "tank", label: "Tank" },
  { value: "healer", label: "Healer" },
  { value: "support", label: "Support" },
]

const TARGET_ARMOR_ITEMS: BadgeToggleGroupItem[] = targetArmor.list.map((ta) => ({
  value: ta.id,
  label: ta.name,
}))

const TARGET_COUNT_ITEMS: BadgeToggleGroupItem[] = [
  { value: "1", label: "Single Target" },
  { value: "3", label: "AOE" },
]

const TARGET_HEALTH_ITEMS: BadgeToggleGroupItem[] = [
  { value: "full", label: "Full" },
  { value: "execute", label: "Execute" },
]

const COMPANION_ITEMS: BadgeToggleGroupItem[] = companions.ids
  .filter((id) => id !== "no-companion")
  .map((id) => ({ value: id, label: requireFirst(companions.data[id].name.split(" ")) }))

const SORT_OPTIONS: SortOption<SortField>[] = [
  { value: "updated", label: "Recent", defaultDirection: "desc" },
  { value: "name", label: "Name", defaultDirection: "asc" },
  { value: "score", label: "Score", defaultDirection: "desc" },
]

const hasDps = (props: FilterPopoverProps) => props.selectedRoles.includes("dps")

const COMPANION_FILTERS: CompanionFilterDef[] = [
  {
    id: "role",
    label: "Role",
    hasValue: (props) => props.selectedRoles.length > 0,
    clearValue: (props) => props.onRolesChange([]),
    renderGroup: (props) => {
      const handleSelect = (items: readonly BadgeToggleGroupItem[]) => {
        props.onRolesChange(items.map((item) => item.value))
      }
      return (
        <BadgeToggleGroup
          items={ROLE_ITEMS}
          value={props.selectedRoles.map((r) => ({ value: r, label: "" }))}
          onSelect={handleSelect}
          unselectedVariant="elevation-muted"
        />
      )
    },
  },
  {
    id: "target-armor",
    label: "Target Armor",
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
          items={TARGET_ARMOR_ITEMS}
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
    label: "Target Count",
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
          items={TARGET_COUNT_ITEMS}
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
    label: "Target Health",
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
          items={TARGET_HEALTH_ITEMS}
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
    label: "Companion",
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
          items={COMPANION_ITEMS}
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
  const popoverProps: FilterPopoverProps = {
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
    if (!isFilterId(id)) return
    setAddedFilters((prev) => new Set(prev).add(id))
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
      <SearchButton value={search} onChange={onSearchChange} placeholder="Search builds..." />

      <SortButton
        options={SORT_OPTIONS}
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
              {filterDef.renderGroup(popoverProps)}
            </FilterGroup>
          ))}
          <AddFilterButton
            options={availableFilters.map((f) => ({ id: f.id, label: f.label }))}
            onAdd={handleAdd}
          />
        </div>
      </FilterButton>
    </SearchSortFilterRow>
  )
}
