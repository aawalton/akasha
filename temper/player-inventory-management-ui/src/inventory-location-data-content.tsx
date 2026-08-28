"use client"

import { useAuth } from "@shared/auth/use-auth"
import { LayoutLink } from "@shared/design-layout/router-context"
import { ListContentSkeleton } from "@shared/design-layout/components/list-content-skeleton"
import { PageTabHeader } from "@shared/design-layout/components/page-tab-header"
import { Button } from "@shared/design-primitives/components/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@shared/design-patterns/components/empty"
import { type SortDirection } from "@shared/design-patterns/utils/sort-types"
import { partitionUnmanagedGuildBanks } from "@temper/game-items-core/inventory-guild-bank-filter"
import { lookupCurrencyConversionRates } from "@temper/game-trading-pricing/currency-price-lookup"
import { usePlayer } from "@temper/player-profile/use-player"
import { Package } from "lucide-react"
import { useMemo } from "react"
import { useInventory, usePriceExtract } from "./hooks-inventory"
import { useManagedGuildBanks } from "./hooks-inventory-settings"
import { InventoryByLocationTab } from "./inventory-by-location-tab"
import { InventoryFilterBar } from "./inventory-filter-bar"
import type { FilterValues, SortField } from "./inventory-filter-types"
import { resolvePricingRegion, resolvePricingRegionNote } from "./pricing-region"
import { PricingRegionNote } from "./pricing-region-note"
import { resolvePricingSourceNote } from "./pricing-source"
import { PricingSourceNote } from "./pricing-source-note"

interface InventoryLocationDataContentProps {
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

export function InventoryLocationDataContent({
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
}: InventoryLocationDataContentProps) {
  const { userId } = useAuth()
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

  const allTraits = useMemo(
    () => [
      ...deferred.armorTraits,
      ...deferred.weaponTraits,
      ...deferred.jewelryTraits,
      ...deferred.companionTraits,
    ],
    [deferred.armorTraits, deferred.weaponTraits, deferred.jewelryTraits, deferred.companionTraits]
  )

  const hasActiveFilters =
    search.length > 0 ||
    qualities.length > 0 ||
    allTraits.length > 0 ||
    sortBy !== "name" ||
    sortDirection !== "asc"

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

  if (!inventory) {
    return (
      <div className="flex flex-col gap-6">
        <PageTabHeader title="By Location" subtitle={pricingHints}>
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
      <PageTabHeader title="By Location" subtitle={pricingHints}>
        {filterBar}
      </PageTabHeader>
      <InventoryByLocationTab
        inventory={inventory}
        excluded={excluded}
        currencies={inventory.currencies}
        conversionRates={conversionRates}
        search={deferred.search}
        qualities={deferred.qualities}
        traits={allTraits}
        sortBy={deferred.sortBy}
        sortDirection={deferred.sortDirection}
        onClearFilters={onClearFilters}
      />
    </div>
  )
}
