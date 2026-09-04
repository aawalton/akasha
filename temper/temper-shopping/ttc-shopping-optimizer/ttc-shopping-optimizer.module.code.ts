import { kioskLocationName } from "@akasha/temper-trading-pricing/kiosk-location-name"
import {
  TTC_AGO,
  type TTCListingClient,
  type TTCListingEntry,
  type TTCListingSearchParams,
} from "@akasha/temper-trading-pricing/ttc-listing-types"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import { computeItemBudget } from "../ttc-budget-strategy/ttc-budget-strategy.module.code.ts"
import type {
  ItemBudget,
  PurchaseRecommendation,
  ShoppingItem,
  ShoppingPlan,
  TaggedListing,
} from "../ttc-shopping-types/ttc-shopping-types.module.code.ts"

interface ShoppingOptimizerOptions {
  ago?: (typeof TTC_AGO)[keyof typeof TTC_AGO]
  maxPagesPerItem?: number
  onSearchProgress?: (completed: number, total: number, key: string) => void
}

function tagListings(
  items: readonly ShoppingItem[],
  batchResults: readonly (readonly TTCListingEntry[])[]
): readonly TaggedListing[] {
  const tagged: TaggedListing[] = []
  for (const [i, item] of items.entries()) {
    const entries = batchResults[i]
    if (!entries) continue
    const key = item.key
    for (const listing of entries) {
      if (listing.TradeAsset == null || !Number.isFinite(listing.TradeAsset.UnitPrice)) continue
      tagged.push({
        key,
        listing,
        unitPrice: listing.TradeAsset.UnitPrice,
      })
    }
  }
  return tagged
}

function findCheapestPerItem(tagged: readonly TaggedListing[]): Map<string, number> {
  const cheapest = new Map<string, number>()
  for (const t of tagged) {
    const current = cheapest.get(t.key)
    if (current === undefined || t.unitPrice < current) {
      cheapest.set(t.key, t.unitPrice)
    }
  }
  return cheapest
}

function selectCheapestWithConsolidation(
  tagged: readonly TaggedListing[]
): readonly PurchaseRecommendation[] {
  const candidatesByItem = new Map<string, TaggedListing[]>()
  for (const t of tagged) {
    let list = candidatesByItem.get(t.key)
    if (!list) {
      list = []
      candidatesByItem.set(t.key, list)
    }
    list.push(t)
  }
  for (const list of candidatesByItem.values()) {
    list.sort((a, b) => a.unitPrice - b.unitPrice)
  }

  const itemKeys = [...candidatesByItem.keys()].sort((a, b) => {
    const aCount = candidatesByItem.get(a)?.length ?? 0
    const bCount = candidatesByItem.get(b)?.length ?? 0
    return aCount - bCount
  })

  const selectedLocations = new Set<string>()
  const claimedListings = new Set<number>()
  const assignedItems = new Set<string>()
  const purchases: PurchaseRecommendation[] = []

  for (const key of itemKeys) {
    if (assignedItems.has(key)) continue
    const allCandidates = candidatesByItem.get(key)
    if (!allCandidates || allCandidates.length === 0) continue

    const unclaimed = allCandidates.filter((t) => !claimedListings.has(t.listing.ID))
    if (unclaimed.length === 0) continue

    const cheapestPrice = requireFirst(unclaimed).unitPrice
    const tied = unclaimed.filter((t) => t.unitPrice === cheapestPrice)

    let picked: TaggedListing | undefined
    for (const t of tied) {
      if (selectedLocations.has(String(t.listing.GuildKioskLocationID))) {
        picked = t
        break
      }
    }

    if (!picked) {
      let bestCount = -1
      for (const t of tied) {
        const loc = String(t.listing.GuildKioskLocationID)
        let count = 0
        for (const otherKey of itemKeys) {
          if (assignedItems.has(otherKey)) continue
          const otherCandidates = candidatesByItem.get(otherKey)
          if (
            otherCandidates?.some(
              (c) =>
                !claimedListings.has(c.listing.ID) && String(c.listing.GuildKioskLocationID) === loc
            )
          ) {
            count++
          }
        }
        if (count > bestCount) {
          bestCount = count
          picked = t
        }
      }
    }

    const finalPicked = picked ?? requireFirst(tied)

    selectedLocations.add(String(finalPicked.listing.GuildKioskLocationID))
    claimedListings.add(finalPicked.listing.ID)
    assignedItems.add(key)
    purchases.push({
      key,
      listing: finalPicked.listing,
      unitPrice: finalPicked.unitPrice,
    })
  }

  return purchases
}

export async function optimizeShopping(
  client: TTCListingClient,
  items: readonly ShoppingItem[],
  options?: ShoppingOptimizerOptions
): Promise<ShoppingPlan> {
  const ago = options?.ago ?? TTC_AGO.Hours6
  const maxPagesPerItem = options?.maxPagesPerItem ?? 3

  const uniqueEntries: { mergedParams: TTCListingSearchParams; indices: number[] }[] = []
  const paramKeyToIndex = new Map<string, number>()
  for (const [i, item] of items.entries()) {
    const pk = JSON.stringify(item.searchParams)
    const existing = paramKeyToIndex.get(pk)
    if (existing !== undefined) {
      const entry = uniqueEntries[existing]
      if (entry) entry.indices.push(i)
    } else {
      paramKeyToIndex.set(pk, uniqueEntries.length)
      uniqueEntries.push({
        mergedParams: {
          ...item.searchParams,
          Ago: ago,
          SortBy: "Price" as const,
          Order: "asc" as const,
        },
        indices: [i],
      })
    }
  }
  const uniqueParamsList = uniqueEntries.map((e) => e.mergedParams)

  const onSearchProgress = options?.onSearchProgress
  onSearchProgress?.(0, uniqueParamsList.length, "")
  let searchCompleted = 0
  const uniqueResults = await client.searchBatch(uniqueParamsList, {
    maxPagesPerItem,
    onItemComplete: onSearchProgress
      ? (index) => {
          searchCompleted++
          const entry = uniqueEntries[index]
          if (!entry) return
          const firstItemIndex = requireFirst(entry.indices)
          const firstItem = items[firstItemIndex]
          if (!firstItem) return
          onSearchProgress(searchCompleted, uniqueParamsList.length, firstItem.key)
        }
      : undefined,
  })

  const batchResults: TTCListingEntry[][] = new Array(items.length)
  for (const [ui, entry] of uniqueEntries.entries()) {
    const result = uniqueResults[ui]
    if (!result) continue
    for (const itemIndex of entry.indices) {
      batchResults[itemIndex] = [...result]
    }
  }

  const tagged = tagListings(items, batchResults)
  const cheapestAnywhere = findCheapestPerItem(tagged)

  const budgets: ItemBudget[] = []
  for (const item of items) {
    const cheapest = cheapestAnywhere.get(item.key)
    if (cheapest !== undefined) {
      budgets.push(computeItemBudget(item.key, cheapest, item.priceData))
    }
  }

  const purchases = selectCheapestWithConsolidation(tagged)

  const locationCounts = new Map<string, number>()
  for (const p of purchases) {
    const loc = String(p.listing.GuildKioskLocationID)
    locationCounts.set(loc, (locationCounts.get(loc) ?? 0) + 1)
  }
  const locations = [...locationCounts.keys()].sort((a, b) => {
    const diff = (locationCounts.get(b) ?? 0) - (locationCounts.get(a) ?? 0)
    if (diff !== 0) return diff
    return kioskLocationName(a).localeCompare(kioskLocationName(b))
  })

  const selectedIDs = new Set(purchases.map((p) => p.listing.ID))
  const alternatives: Record<string, TaggedListing[]> = {}
  for (const t of tagged) {
    if (selectedIDs.has(t.listing.ID)) continue
    let list = alternatives[t.key]
    if (!list) {
      list = []
      alternatives[t.key] = list
    }
    list.push(t)
  }
  for (const list of Object.values(alternatives)) {
    list.sort((a, b) => a.unitPrice - b.unitPrice)
  }

  const totalCost = purchases.reduce((sum, p) => sum + p.unitPrice, 0)
  const purchasedKeys = new Set(purchases.map((p) => p.key))
  const missingItems = items.filter((i) => !purchasedKeys.has(i.key)).map((i) => i.key)

  return {
    purchases,
    locations,
    totalCost,
    missingItems,
    budgets,
    alternatives,
  }
}
