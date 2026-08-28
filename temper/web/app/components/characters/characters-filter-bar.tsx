"use client"

import { BadgeToggleGroup, type BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import { AddFilterButton } from "@shared/design-patterns/components/add-filter-button"
import { FilterButton } from "@shared/design-patterns/components/filter-button"
import { FilterGroup } from "@shared/design-patterns/components/filter-group"
import { SearchButton } from "@shared/design-patterns/components/search-button"
import { SearchSortFilterRow } from "@shared/design-patterns/components/search-sort-filter-row"
import { SortButton } from "@shared/design-patterns/components/sort-button"
import { type SortDirection } from "@shared/design-patterns/utils/sort-types"
import { useState } from "react"
import {
  type CharactersFilterDef,
  type CharactersFilterId,
  type CharactersFilterPopoverProps,
  CLASS_ITEMS,
  isCharactersFilterId,
  ROLE_ITEMS,
  SORT_OPTIONS,
  type SortField,
} from "@/components/characters/characters-filter-types"

const CHARACTERS_FILTERS: CharactersFilterDef[] = [
  {
    id: "role",
    label: "Role",
    hasValue: ({ selectedRole }) => selectedRole !== null,
    clearValue: ({ onRoleChange }) => onRoleChange(null),
    renderGroup: ({ selectedRole, onRoleChange }: CharactersFilterPopoverProps) => {
      function handleSelect(items: readonly BadgeToggleGroupItem[]) {
        if (items.length === 0) {
          onRoleChange(null)
        } else {
          const newItem = items.find((item) => item.value !== selectedRole)
          onRoleChange(newItem?.value ?? null)
        }
      }
      return (
        <BadgeToggleGroup
          items={ROLE_ITEMS}
          value={selectedRole != null ? [{ value: selectedRole, label: "" }] : []}
          onSelect={handleSelect}
          unselectedVariant="elevation-muted"
          wrap
        />
      )
    },
  },
  {
    id: "class",
    label: "Class",
    hasValue: ({ selectedClass }) => selectedClass !== null,
    clearValue: ({ onClassChange }) => onClassChange(null),
    renderGroup: ({ selectedClass, onClassChange }: CharactersFilterPopoverProps) => {
      function handleSelect(items: readonly BadgeToggleGroupItem[]) {
        if (items.length === 0) {
          onClassChange(null)
        } else {
          const newItem = items.find((item) => item.value !== selectedClass)
          onClassChange(newItem?.value ?? null)
        }
      }
      return (
        <BadgeToggleGroup
          items={CLASS_ITEMS}
          value={selectedClass != null ? [{ value: selectedClass, label: "" }] : []}
          onSelect={handleSelect}
          unselectedVariant="elevation-muted"
          wrap
        />
      )
    },
  },
]

interface CharactersFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  selectedRole: string | null
  onRoleChange: (value: string | null) => void
  selectedClass: string | null
  onClassChange: (value: string | null) => void
  sortBy: SortField
  sortDirection: SortDirection
  onSortChange: (field: SortField, direction: SortDirection) => void
  hasActiveFilters: boolean
  onReset: () => void
}

export function CharactersFilterBar({
  search,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedClass,
  onClassChange,
  sortBy,
  sortDirection,
  onSortChange,
  hasActiveFilters,
  onReset,
}: CharactersFilterBarProps) {
  const popoverProps: CharactersFilterPopoverProps = {
    selectedRole,
    selectedClass,
    onRoleChange,
    onClassChange,
  }

  const [addedFilters, setAddedFilters] = useState<Set<CharactersFilterId>>(() => {
    const initial = new Set<CharactersFilterId>()
    for (const f of CHARACTERS_FILTERS) {
      if (f.hasValue(popoverProps)) initial.add(f.id)
    }
    return initial
  })

  const visibleFilters = CHARACTERS_FILTERS.filter(
    (f) => addedFilters.has(f.id) || f.hasValue(popoverProps)
  )

  const availableFilters = CHARACTERS_FILTERS.filter(
    (f) => !addedFilters.has(f.id) && !f.hasValue(popoverProps)
  )

  function handleAdd(id: string) {
    if (!isCharactersFilterId(id)) return
    setAddedFilters((prev) => new Set(prev).add(id))
  }

  function handleRemove(filterDef: CharactersFilterDef) {
    filterDef.clearValue(popoverProps)
    setAddedFilters((prev) => {
      const next = new Set(prev)
      next.delete(filterDef.id)
      return next
    })
  }

  const hasActiveFilterValues = selectedRole !== null || selectedClass !== null

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
        defaultSort={{ field: "updated", direction: "desc" }}
      />

      <FilterButton
        hasActiveFilters={hasActiveFilterValues || addedFilters.size > 0}
        popoverClassName="max-w-panel"
        emptySelectOptions={availableFilters.map((f) => ({ id: f.id, label: f.label }))}
        onEmptySelect={handleAdd}
      >
        <div className="flex flex-col gap-3">
          {visibleFilters.map((filterDef) => (
            <FilterGroup
              key={filterDef.id}
              label={filterDef.label}
              onRemove={() => handleRemove(filterDef)}
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
