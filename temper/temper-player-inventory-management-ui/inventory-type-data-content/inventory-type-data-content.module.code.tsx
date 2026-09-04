"use client"

import { ListContentSkeleton } from "@akasha/design-layout/list-content-skeleton"
import { PageTabHeader } from "@akasha/design-layout/page-tab-header"
import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import { LayoutLink } from "@akasha/design-layout/router-context"
import { scrollToCard } from "@akasha/design-layout/scroll-to-card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@akasha/design-patterns/empty"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { Button } from "@akasha/design-primitives/button"
import { useUserId } from "@akasha/pages-ui/use-user-id"
import { computeCurrencyGoldTotal } from "@akasha/temper-items-core/inventory-currencies"
import {
  filterInventoryTypeGroups,
  groupInventoryByType,
} from "@akasha/temper-items-core/inventory-grouping"
import { partitionUnmanagedGuildBanks } from "@akasha/temper-items-core/inventory-guild-bank-filter"
import { usePlayer } from "@akasha/temper-player-profile/use-player"
import { lookupCurrencyConversionRates } from "@akasha/temper-trading-pricing/currency-price-lookup"
import { Package, Search } from "lucide-react"
import { useMemo } from "react"
import { useInventory, usePriceExtract } from "../hooks-inventory/hooks-inventory.module.code.ts"
import { useManagedGuildBanks } from "../hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { InventoryCurrencyPanelCard } from "../inventory-currency-panel-card/inventory-currency-panel-card.module.code.tsx"
import { InventoryFilterBar } from "../inventory-filter-bar/inventory-filter-bar.module.code.tsx"
import type {
  FilterValues,
  SortField,
} from "../inventory-filter-types/inventory-filter-types.module.code.ts"
import { InventoryScopeNote } from "../inventory-scope-note/inventory-scope-note.module.code.tsx"
import { InventoryTypeSummaryPanelCard } from "../inventory-summary-panel-card/inventory-summary-panel-card.module.code.tsx"
import { InventoryTypePanelCard } from "../inventory-type-panel-card/inventory-type-panel-card.module.code.tsx"
import {
  resolvePricingRegion,
  resolvePricingRegionNote,
} from "../pricing-region/pricing-region.module.code.ts"
import { PricingRegionNote } from "../pricing-region-note/pricing-region-note.module.code.tsx"
import { resolvePricingSourceNote } from "../pricing-source/pricing-source.module.code.ts"
import { PricingSourceNote } from "../pricing-source-note/pricing-source-note.module.code.tsx"

interface InventoryTypeDataContentProps {
  search: string
  qualities: readonly number[]
  onSearchChange: (search: string) => void
  onQualitiesChange: (qualities: readonly number[]) => void
  armorTraits: readonly string[]
  onArmorTraitsChange: (traits: readonly string[]) => void
  weaponTraits: readonly string[]
  onWeaponTraitsChange: (traits: readonly string[]) => void
  jewelryTraits: readonly string[]
  onJewelryTraitsChange: (traits: readonly string[]) => void
  companionTraits: readonly string[]
  onCompanionTraitsChange: (traits: readonly string[]) => void
  sortBy: SortField
  sortDirection: SortDirection
  onSortChange: (sortBy: SortField, sortDirection: SortDirection) => void
  onClearFilters: () => void
  deferred: FilterValues
}

export function InventoryTypeDataContent({
  search,
  qualities,
  onSearchChange,
  onQualitiesChange,
  armorTraits,
  onArmorTraitsChange,
  weaponTraits,
  onWeaponTraitsChange,
  jewelryTraits,
  onJewelryTraitsChange,
  companionTraits,
  onCompanionTraitsChange,
  sortBy,
  sortDirection,
  onSortChange,
  onClearFilters,
  deferred,
}: InventoryTypeDataContentProps) {
  const userId = useUserId()
  const { isLoading: playerLoading, profileMetadata } = usePlayer()
  const { inventory: rawInventory, isLoading } = useInventory(userId)
  const { managedSet } = useManagedGuildBanks()
  const pricingRegion = resolvePricingRegion(profileMetadata)
  const {
    pricing: currencyPricing,
    isLoading: pricingLoading,
    error: pricingError,
  } = usePriceExtract("currency-items", pricingRegion.platform, pricingRegion.server)

  const { inventory, excluded } = useMemo(
    () =>
      rawInventory
        ? partitionUnmanagedGuildBanks(rawInventory, managedSet)
        : { inventory: null, excluded: [] },
    [rawInventory, managedSet]
  )

  const conversionRates = useMemo(() => {
    if (!currencyPricing) return undefined
    return lookupCurrencyConversionRates(currencyPricing)
  }, [currencyPricing])

  const typeSummary = useMemo(() => {
    if (!inventory) return null
    return groupInventoryByType(inventory)
  }, [inventory])

  const allTraits = useMemo(
    () => [
      ...deferred.armorTraits,
      ...deferred.weaponTraits,
      ...deferred.jewelryTraits,
      ...deferred.companionTraits,
    ],
    [deferred.armorTraits, deferred.weaponTraits, deferred.jewelryTraits, deferred.companionTraits]
  )

  const filteredTypeGroups = useMemo(() => {
    if (!typeSummary) return null
    if (deferred.search === "" && deferred.qualities.length === 0 && allTraits.length === 0)
      return typeSummary.groups
    return filterInventoryTypeGroups(
      typeSummary.groups,
      deferred.search,
      deferred.qualities,
      allTraits
    )
  }, [typeSummary, deferred.search, deferred.qualities, allTraits])

  const filteredTypeSummary = useMemo(() => {
    if (!typeSummary || !filteredTypeGroups) return null
    if (filteredTypeGroups === typeSummary.groups) return typeSummary

    let totalItems = 0
    let totalOccupiedSlots = 0
    let totalValue: number | undefined
    let hasAnyValue = false
    for (const group of filteredTypeGroups) {
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
      groups: filteredTypeGroups,
    }
  }, [typeSummary, filteredTypeGroups])

  const currencySummaryResult = useMemo(
    () => computeCurrencyGoldTotal(inventory?.currencies, conversionRates),
    [inventory?.currencies, conversionRates]
  )

  const hasActiveFilters =
    search.length > 0 ||
    qualities.length > 0 ||
    allTraits.length > 0 ||
    sortBy !== "name" ||
    sortDirection !== "asc"

  function handleSummaryClick(key: string) {
    const categoryId = key.toLowerCase().replace(/\s+/g, "-")
    scrollToCard(`inventory-${categoryId}`, false)
  }

  const filterBar = (
    <InventoryFilterBar
      search={search}
      onSearchChange={onSearchChange}
      qualities={qualities}
      onQualitiesChange={onQualitiesChange}
      armorTraits={armorTraits}
      onArmorTraitsChange={onArmorTraitsChange}
      weaponTraits={weaponTraits}
      onWeaponTraitsChange={onWeaponTraitsChange}
      jewelryTraits={jewelryTraits}
      onJewelryTraitsChange={onJewelryTraitsChange}
      companionTraits={companionTraits}
      onCompanionTraitsChange={onCompanionTraitsChange}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSortChange={onSortChange}
      hasActiveFilters={hasActiveFilters}
      onReset={onClearFilters}
    />
  )

  const pricingHints = (
    <>
      <PricingRegionNote
        kind={resolvePricingRegionNote({
          playerSettled: !playerLoading,
          isDefaulted: pricingRegion.isDefaulted,
          pricing: currencyPricing,
          isLoading: pricingLoading,
          error: pricingError,
        })}
        platform={pricingRegion.platform}
        server={pricingRegion.server}
      />
      <PricingSourceNote
        kind={resolvePricingSourceNote({
          inventory: inventory ?? null,
          isSettled: !isLoading,
        })}
      />
    </>
  )

  if (isLoading) return <ListContentSkeleton />

  if (!typeSummary) {
    return (
      <div className="flex flex-col gap-6">
        <PageTabHeader title="By Type" subtitle={pricingHints}>
          {filterBar}
        </PageTabHeader>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Package />
            </EmptyMedia>
            <EmptyTitle>No inventory data</EmptyTitle>
            <EmptyDescription>
              No inventory has reached this page for your account. Inventory comes from the file the
              TemperInventory add-on writes while you play — the Watcher syncs that file for you, or
              you can upload it by hand.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild variant="accent">
              <LayoutLink href="/watcher">Check sync status</LayoutLink>
            </Button>
            <Button asChild variant="secondary">
              <LayoutLink href="/import">Go to Import</LayoutLink>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PageTabHeader title="By Type" subtitle={pricingHints}>
        {filterBar}
      </PageTabHeader>
      {hasActiveFilters && filteredTypeGroups?.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Search />
            </EmptyMedia>
            <EmptyTitle>No matching items</EmptyTitle>
            <EmptyDescription>
              Try adjusting your search or filters to find what you're looking for.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="secondary" size="sm" onClick={onClearFilters}>
              Clear filters
            </Button>
          </EmptyContent>
        </Empty>
      ) : filteredTypeSummary ? (
        <ResponsiveColumns hasSummaryPanel>
          <InventoryTypeSummaryPanelCard
            summary={filteredTypeSummary}
            currencyCount={!hasActiveFilters ? currencySummaryResult?.count : undefined}
            currencyGoldTotal={!hasActiveFilters ? currencySummaryResult?.goldTotal : undefined}
            onItemClick={handleSummaryClick}
            scopeNote={
              <InventoryScopeNote
                excluded={excluded}
                includesCurrencies={
                  !hasActiveFilters && currencySummaryResult?.goldTotal !== undefined
                }
                filtered={hasActiveFilters}
              />
            }
          />
          {inventory?.currencies && !hasActiveFilters && (
            <InventoryCurrencyPanelCard
              currencies={inventory.currencies}
              conversionRates={conversionRates}
            />
          )}
          {filteredTypeGroups?.map((group) => (
            <InventoryTypePanelCard
              key={group.category}
              group={group}
              sortMode={deferred.sortBy}
              sortDirection={deferred.sortDirection}
            />
          ))}
        </ResponsiveColumns>
      ) : null}
    </div>
  )
}
