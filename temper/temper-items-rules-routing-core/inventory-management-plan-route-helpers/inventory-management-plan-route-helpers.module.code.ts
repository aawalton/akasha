import { computeValue } from "@akasha/temper-items-core/inventory-display-value"
import type {
  InventoryDatabase,
  InventoryItemData,
} from "@akasha/temper-items-core/inventory-types"
import { getLocationDisplayName } from "@akasha/temper-items-core/location-classify"
import type {
  ItemAction,
  MoveToDestination,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { VenueType } from "../inventory-management-plan-types/inventory-management-plan-types.module.code.ts"

export function computePlanItemValue(
  action: ItemAction,
  item: InventoryItemData
): number | undefined {
  switch (action) {
    case "sell":
    case "fence-sell":
      return item.merchantValue
    case "list":
      return item.estimatedValue
    case "mail":
      return undefined
    case "nothing":
    case "lock":
    case "unlock":
    case "move-to":
    case "stock":
    case "character-equip":
    case "companion-equip":
    case "deconstruct":
    case "refine":
    case "destroy":
    case "fence-launder":
    case "research":
    case "use":
    case "open":
      return computeValue(item.estimatedValue, item.merchantValue, item.replacementCost)
    default:
      return assertNever(action)
  }
}

export function extractTargetCharId(destination: MoveToDestination | undefined): string | null {
  if (destination == null) return null
  if (destination.startsWith("character:")) {
    const id = destination.slice("character:".length)
    return id !== "by-priority" ? id : null
  }
  if (destination.startsWith("character-worn:")) {
    const id = destination.slice("character-worn:".length)
    return id !== "by-priority" ? id : null
  }
  return null
}

export function getFirstCharacterId(inventory: InventoryDatabase | null): string | null {
  if (!inventory?.currencies?.characters) return null
  const charIds = Object.keys(inventory.currencies.characters)
  return charIds[0] ?? null
}

export function resolveStorageKey(
  venue: VenueType | null,
  destination: MoveToDestination | undefined,
  inventory: InventoryDatabase | null
): string | undefined {
  if (venue == null) return undefined
  if (venue === "bank") {
    if (destination === "craft-bag") return undefined
    return "Bank"
  }
  if (venue === "house-storage") {
    if (destination === "furniture-vault") return "FurnitureVault"
    if (destination?.startsWith("house-storage:")) {
      const chestId = destination.slice("house-storage:".length)
      if (inventory) {
        for (const key of Object.keys(inventory.locations)) {
          if (key.startsWith("HouseBank:") && key.endsWith(`:${chestId}`)) return key
        }
      }
    }
    return undefined
  }
  if (venue === "guild-bank") {
    if (destination?.startsWith("guild-bank:")) return destination.slice("guild-bank:".length)
    return undefined
  }
  return undefined
}

export function resolveStorageDetail(
  venue: VenueType | null,
  destination: MoveToDestination | undefined,
  inventory: InventoryDatabase | null
): string | undefined {
  if (venue == null || destination == null || !inventory) return undefined

  if (venue === "house-storage" && destination === "furniture-vault") {
    return "Furniture Vault"
  }

  if (venue === "house-storage" && destination.startsWith("house-storage:")) {
    const chestId = destination.slice("house-storage:".length)
    for (const [key, location] of Object.entries(inventory.locations)) {
      if (key.startsWith("HouseBank:") && key.endsWith(`:${chestId}`)) {
        return getLocationDisplayName(key, location.displayName)
      }
    }
  }

  if (venue === "guild-bank" && destination.startsWith("guild-bank:")) {
    const guildKey = destination.slice("guild-bank:".length)
    const location = inventory.locations[guildKey]
    if (location) return location.displayName !== "" ? location.displayName : guildKey
  }

  return undefined
}

export function resolveCharacterName(charId: string, inventory: InventoryDatabase | null): string {
  if (!inventory) return charId
  const charData = inventory.currencies?.characters?.[charId]
  if (charData?.displayName != null) return charData.displayName
  const location = inventory.locations[charId]
  if (location?.displayName != null) return location.displayName
  return charId
}
