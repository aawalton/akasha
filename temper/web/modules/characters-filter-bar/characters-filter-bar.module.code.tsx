"use client"

import {
  BadgeToggleGroup,
  type BadgeToggleGroupItem,
} from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import { AddFilterButton } from "akasha/design/interface/pattern/modules/add-filter-button/add-filter-button.module.code.tsx"
import { FilterButton } from "akasha/design/interface/pattern/modules/filter-button/filter-button.module.code.tsx"
import { FilterGroup } from "akasha/design/interface/pattern/modules/filter-group/filter-group.module.code.tsx"
import { SearchButton } from "akasha/design/interface/pattern/modules/search-button/search-button.module.code.tsx"
import { SearchSortFilterRow } from "akasha/design/interface/pattern/modules/search-sort-filter-row/search-sort-filter-row.module.code.tsx"
import { SortButton } from "akasha/design/interface/pattern/modules/sort-button/sort-button.module.code.tsx"
import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import {
  type CharactersFilterDef,
  type CharactersFilterId,
  type CharactersFilterPopoverProps,
  classItems,
  isCharactersFilterId,
  roleItems,
  type SortField,
  sortOptions,
} from "akasha/temper/web/modules/characters-filter-types/characters-filter-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { charactersFilterBarClass } from "akasha/temper/web/phrase/pages/characters-filter-bar-class.temper-web-phrase.ts"
import { charactersFilterBarRole } from "akasha/temper/web/phrase/pages/characters-filter-bar-role.temper-web-phrase.ts"
import { charactersFilterBarSearchBuilds } from "akasha/temper/web/phrase/pages/characters-filter-bar-search-builds.temper-web-phrase.ts"
import { useMemo, useState } from "react"

const CHARACTERS_FILTERS: CharactersFilterDef[] = [
  {
    id: "role",
    labelPhrase: charactersFilterBarRole.slug,
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
          items={roleItems()}
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
    labelPhrase: charactersFilterBarClass.slug,
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
          items={classItems()}
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
  const phrase = usePhrase()
  const sorts = useMemo(() => sortOptions(phrase), [phrase])
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
      <SearchButton
        value={search}
        onChange={onSearchChange}
        placeholder={phrase(charactersFilterBarSearchBuilds.slug)}
      />

      <SortButton
        options={sorts}
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
        emptySelectOptions={availableFilters.map((f) => ({
          id: f.id,
          label: phrase(f.labelPhrase),
        }))}
        onEmptySelect={handleAdd}
      >
        <div className="flex flex-col gap-3">
          {visibleFilters.map((filterDef) => (
            <FilterGroup
              key={filterDef.id}
              label={phrase(filterDef.labelPhrase)}
              onRemove={() => handleRemove(filterDef)}
            >
              {filterDef.renderGroup(popoverProps)}
            </FilterGroup>
          ))}
          <AddFilterButton
            options={availableFilters.map((f) => ({ id: f.id, label: phrase(f.labelPhrase) }))}
            onAdd={handleAdd}
          />
        </div>
      </FilterButton>
    </SearchSortFilterRow>
  )
}
