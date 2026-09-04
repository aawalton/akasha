import { ESO_BAG_BACKPACK } from "@akasha/temper-items-core/eso-bag-constants"
import type {
  InventoryDatabase,
  InventoryItemData,
} from "@akasha/temper-items-core/inventory-types"
import { classifyLocation } from "@akasha/temper-items-core/location-classify"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"

export function isItemStackable(item: InventoryItemData): boolean {
  return item.equipType == null || item.equipType === 0
}

interface MergedEntry {
  entry: AffectedItem
  sourceSlotCount: number
}

export function mergeStackableEntries(entries: readonly AffectedItem[]): readonly MergedEntry[] {
  const merged: MergedEntry[] = []
  const mergeMap = new Map<string, MergedEntry>()

  for (const entry of entries) {
    const isCharSource = classifyLocation(entry.locationKey) === "character"
    if (entry.useAllocation !== undefined) {
      merged.push({ entry, sourceSlotCount: 1 })
      continue
    }
    if (!isCharSource || !isItemStackable(entry.item)) {
      merged.push({ entry, sourceSlotCount: 1 })
      continue
    }

    const key = `${entry.item.itemId}\0${entry.locationKey}\0${entry.item.quality}\0${entry.item.stolen ?? false}`
    const existing = mergeMap.get(key)
    if (existing) {
      existing.entry = {
        ...existing.entry,
        item: {
          ...existing.entry.item,
          stackCount: existing.entry.item.stackCount + entry.item.stackCount,
        },
      }
      existing.sourceSlotCount++
    } else {
      const me: MergedEntry = { entry, sourceSlotCount: 1 }
      mergeMap.set(key, me)
      merged.push(me)
    }
  }

  return merged
}

export function getBackpackFreeSlots(
  charId: string,
  inventory: InventoryDatabase | null,
  bufferSlots?: number
): number | null {
  if (!inventory) return null
  const location = inventory.locations[charId]
  if (!location) return null
  const totalCapacity = location.bagSizes?.[ESO_BAG_BACKPACK]
  if (totalCapacity === undefined) return null
  const usedSlots = Object.keys(location.bags[ESO_BAG_BACKPACK] ?? {}).length
  return Math.max(0, totalCapacity - usedSlots - (bufferSlots ?? 0))
}

const CAPACITY_STORAGE_TYPES = new Set(["bank", "housing-storage", "guild"])

function getStorageFreeSlots(locationKey: string, inventory: InventoryDatabase | null): number {
  if (!inventory) return 0
  const location = inventory.locations[locationKey]
  if (!location?.bagSizes) return 0
  let totalCapacity = 0
  let totalUsed = 0
  for (const [bagIdStr, capacity] of Object.entries(location.bagSizes)) {
    const bagId = Number(bagIdStr)
    totalCapacity += capacity
    totalUsed += Object.keys(location.bags[bagId] ?? {}).length
  }
  return totalCapacity - totalUsed
}

export function buildStorageFreeSlots(inventory: InventoryDatabase | null): Map<string, number> {
  const map = new Map<string, number>()
  if (!inventory) return map
  for (const key of Object.keys(inventory.locations)) {
    const locType = classifyLocation(key)
    if (CAPACITY_STORAGE_TYPES.has(locType)) {
      map.set(key, getStorageFreeSlots(key, inventory))
    }
  }
  return map
}

export function buildExistingStorageItems(
  inventory: InventoryDatabase | null
): Map<string, Set<number>> {
  const map = new Map<string, Set<number>>()
  if (!inventory) return map
  for (const [key, location] of Object.entries(inventory.locations)) {
    const locType = classifyLocation(key)
    if (!CAPACITY_STORAGE_TYPES.has(locType)) continue
    const itemIds = new Set<number>()
    for (const bagId of Object.keys(location.bags)) {
      const bag = location.bags[Number(bagId)]
      if (!bag) continue
      for (const item of Object.values(bag)) {
        if (isItemStackable(item)) {
          itemIds.add(item.itemId)
        }
      }
    }
    if (itemIds.size > 0) map.set(key, itemIds)
  }
  return map
}
