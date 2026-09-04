import type { InventoryDatabase } from "../inventory-types/inventory-types.module.code.ts"
import { computeInventoryTotalValue } from "../inventory-value/inventory-value.module.code.ts"
import { classifyLocation } from "../location-classify/location-classify.module.code.ts"

export type ExclusionReason = "unmanaged-guild-bank" | "unclassifiable-location"

export interface ExcludedLocation {
  readonly key: string
  readonly displayName: string
  readonly value: number
  readonly reason: ExclusionReason
}

export interface ScopedInventory {
  readonly inventory: InventoryDatabase
  readonly excluded: readonly ExcludedLocation[]
}

export function partitionUnmanagedGuildBanks(
  inventory: InventoryDatabase,
  managedSet: ReadonlySet<string>
): ScopedInventory {
  const kept: Record<string, (typeof inventory.locations)[string]> = {}
  const excluded: ExcludedLocation[] = []

  for (const [key, location] of Object.entries(inventory.locations)) {
    if (classifyLocation(key) !== "guild" || managedSet.has(key)) {
      kept[key] = location
      continue
    }
    excluded.push({
      key,
      displayName: location.displayName !== "" ? location.displayName : key,
      value: computeInventoryTotalValue({ ...inventory, locations: { [key]: location } }),
      reason: key === "" ? "unclassifiable-location" : "unmanaged-guild-bank",
    })
  }

  return { inventory: { ...inventory, locations: kept }, excluded }
}

export function extractGuildBankKeys(
  inventory: InventoryDatabase
): readonly { key: string; displayName: string }[] {
  const result: { key: string; displayName: string }[] = []
  for (const [key, location] of Object.entries(inventory.locations)) {
    if (key !== "" && classifyLocation(key) === "guild") {
      result.push({ key, displayName: location.displayName !== "" ? location.displayName : key })
    }
  }
  result.sort((a, b) => a.displayName.localeCompare(b.displayName))
  return result
}
