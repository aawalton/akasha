"use client"

import { ResponsiveColumns } from "akasha/design/interface/layout/modules/responsive-columns/responsive-columns.module.code.tsx"
import { scrollToCard } from "akasha/design/interface/layout/modules/scroll-to-card/scroll-to-card.module.code.ts"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { temperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.ts"
import { computeCurrencyGoldTotal } from "akasha/temper/items/core/modules/inventory-currencies/inventory-currencies.module.code.ts"
import {
  filterInventoryGroups,
  groupInventoryByLocation,
  type InventoryLocationGroup,
  type InventoryLocationSummary,
} from "akasha/temper/items/core/modules/inventory-grouping/inventory-grouping.module.code.ts"
import type { ExcludedLocation } from "akasha/temper/items/core/modules/inventory-guild-bank-filter/inventory-guild-bank-filter.module.code.ts"
import type {
  InventoryCurrencies,
  InventoryDatabase,
} from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { titleOf } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type { LocationTypeId } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { heldSkillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { temperInventoryCurrency } from "akasha/temper/player/holdings/temper-inventory-currency/temper-inventory-currency.page-type.ts"
import { useHeldCompanionCatalog } from "akasha/temper/web/modules/use-companion-catalog/use-companion-catalog.module.code.tsx"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { inventoryTypeDataContentClearFilters } from "akasha/temper/web/phrase/pages/inventory-type-data-content-clear-filters.temper-web-phrase.ts"
import { inventoryTypeDataContentNoMatch } from "akasha/temper/web/phrase/pages/inventory-type-data-content-no-match.temper-web-phrase.ts"
import { inventoryTypeDataContentNoMatchNote } from "akasha/temper/web/phrase/pages/inventory-type-data-content-no-match-note.temper-web-phrase.ts"
import { InventoryLocationSummaryPanelCard } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-location-summary-panel-card/inventory-location-summary-panel-card.module.code.tsx"
import {
  InventoryLocationTypePanelCard,
  type LocationTypeCardData,
} from "akasha/temper/web/player-inventory-management-ui/modules/inventory-location-type-panel-card/inventory-location-type-panel-card.module.code.tsx"
import type { InventorySortMode } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-panel-card/inventory-panel-card.module.code.tsx"
import { InventoryScopeNote } from "akasha/temper/web/player-inventory-management-ui/modules/inventory-scope-note/inventory-scope-note.module.code.tsx"
import { Search } from "lucide-react"
import { useMemo } from "react"

const UNREAD_SUMMARY: InventoryLocationSummary = {
  totalItems: 0,
  occupiedSlots: 0,
  totalValue: undefined,
  groups: [],
}

interface InventoryByLocationTabProps {
  inventory: InventoryDatabase
  excluded?: readonly ExcludedLocation[]
  currencies?: InventoryCurrencies
  conversionRates?: Record<string, number>
  search?: string
  qualities?: readonly number[]
  traits?: readonly string[]
  sortBy?: InventorySortMode
  sortDirection?: SortDirection
  onClearFilters?: () => void
}

export function InventoryByLocationTab({
  inventory,
  excluded = [],
  currencies,
  conversionRates,
  search = "",
  qualities = [],
  traits = [],
  sortBy,
  sortDirection,
  onClearFilters,
}: InventoryByLocationTabProps) {
  const phrase = usePhrase()
  const locations = useKeyedTitles(temperLocationType.slug)
  const currencyTitles = useKeyedTitles(temperInventoryCurrency.slug)
  const venues = useKeyedTitles(temperVenue.slug)
  const summary = useMemo(
    () =>
      locations === null ? UNREAD_SUMMARY : groupInventoryByLocation(inventory, locations, venues),
    [inventory, locations, venues]
  )

  const skillCatalogRead = heldSkillCatalog()
  const companionCatalogRead = useHeldCompanionCatalog()

  const filteredSummary = useMemo(() => {
    if (search === "" && qualities.length === 0 && traits.length === 0) return summary
    const filteredGroups = filterInventoryGroups(summary.groups, search, qualities, traits)
    let totalItems = 0
    let totalOccupiedSlots = 0
    let totalValue: number | undefined
    let hasAnyValue = false
    for (const group of filteredGroups) {
      totalItems += group.totalItems
      totalOccupiedSlots += group.occupiedSlots
      if (group.totalValue !== undefined) {
        hasAnyValue = true
        totalValue = (totalValue ?? 0) + group.totalValue
      }
    }
    return {
      totalItems,
      occupiedSlots: totalOccupiedSlots,
      totalValue: hasAnyValue ? totalValue : undefined,
      groups: filteredGroups,
    }
  }, [summary, search, qualities, traits, skillCatalogRead, companionCatalogRead])

  const cards = useMemo(() => {
    const typeMap = new Map<LocationTypeId, InventoryLocationGroup[]>()
    for (const group of filteredSummary.groups) {
      let list = typeMap.get(group.locationType)
      if (!list) {
        list = []
        typeMap.set(group.locationType, list)
      }
      list.push(group)
    }

    const result: LocationTypeCardData[] = []
    for (const [locationType, groups] of typeMap) {
      const title = locations === null ? locationType : titleOf(locations, locationType)
      result.push({ locationType, title, groups })
    }
    result.sort((a, b) => a.title.localeCompare(b.title))
    return result
  }, [filteredSummary.groups, locations])

  function handleSummaryClick(key: string) {
    const card =
      cards.find((c) => c.locationType === key) ??
      cards.find((c) => c.groups.some((g) => g.locationKey === key))
    if (card) {
      scrollToCard(`inventory-location-${card.locationType}`, false)
    }
  }

  const currencySummaryResult = useMemo(
    () =>
      currencyTitles === null
        ? undefined
        : computeCurrencyGoldTotal(currencies, currencyTitles, conversionRates),
    [currencies, currencyTitles, conversionRates]
  )

  const hasActiveFilters = search.length > 0 || qualities.length > 0 || traits.length > 0

  if (locations === null || currencyTitles === null) return null

  if (hasActiveFilters && filteredSummary.groups.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyTitle>{phrase(inventoryTypeDataContentNoMatch.slug)}</EmptyTitle>
          <EmptyDescription>{phrase(inventoryTypeDataContentNoMatchNote.slug)}</EmptyDescription>
        </EmptyHeader>
        {onClearFilters && (
          <EmptyContent>
            <Button variant="secondary" size="sm" onClick={onClearFilters}>
              {phrase(inventoryTypeDataContentClearFilters.slug)}
            </Button>
          </EmptyContent>
        )}
      </Empty>
    )
  }

  return (
    <ResponsiveColumns hasSummaryPanel sortChildren={false}>
      <InventoryLocationSummaryPanelCard
        summary={filteredSummary}
        locations={locations}
        currencyCount={!hasActiveFilters ? currencySummaryResult?.count : undefined}
        currencyGoldTotal={!hasActiveFilters ? currencySummaryResult?.goldTotal : undefined}
        onItemClick={handleSummaryClick}
        scopeNote={
          <InventoryScopeNote
            excluded={excluded}
            includesCurrencies={!hasActiveFilters && currencySummaryResult?.goldTotal !== undefined}
            filtered={hasActiveFilters}
          />
        }
      />
      {cards.map((card) => (
        <InventoryLocationTypePanelCard
          key={card.locationType}
          card={card}
          currencies={!hasActiveFilters ? currencies : undefined}
          currencyTitles={currencyTitles}
          conversionRates={conversionRates}
          sortMode={sortBy}
          sortDirection={sortDirection}
        />
      ))}
    </ResponsiveColumns>
  )
}
