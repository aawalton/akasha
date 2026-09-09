import { ESO_BAG_BACKPACK, ESO_BAG_WORN } from "@akasha/temper-items-core/eso-bag-constants"
import { ESO_ITEMTYPE_CONTAINER } from "@akasha/temper-items-core/inventory-types"
import { classifyLocation } from "@akasha/temper-items-core/location-classify"
import type { LocationTypeId } from "@akasha/temper-items-core/location-type-data"
import type {
  AffectedItem,
  ClassifiedInventoryItem,
} from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { ItemAction } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { CharacterId } from "@akasha/temper-items-rules-core/use-destination-types"

export function toAffectedItem(
  ci: ClassifiedInventoryItem,
  alreadyAtDestination: boolean
): AffectedItem {
  return {
    item: ci.item,
    locationKey: ci.locationKey,
    locationDisplayName: ci.locationDisplayName,
    bagId: ci.bagId,
    alreadyAtDestination,
  }
}

export function buildAffectedItem(
  ci: ClassifiedInventoryItem,
  alreadyAtDestination: boolean,
  quantity?: number,
  useAllocation?: readonly CharacterId[]
): AffectedItem {
  const result: AffectedItem = {
    item: ci.item,
    locationKey: ci.locationKey,
    locationDisplayName: ci.locationDisplayName,
    bagId: ci.bagId,
    alreadyAtDestination,
  }
  if (quantity !== undefined) result.quantity = quantity
  if (useAllocation !== undefined) result.useAllocation = useAllocation
  return result
}

export function isContainerBlockedByAction(
  item: { itemType: number; stolen?: boolean },
  action: string
): boolean {
  if (item.itemType !== ESO_ITEMTYPE_CONTAINER) return false
  if (action === "fence-launder" || action === "fence-sell") return true
  if (action === "sell" && item.stolen === true) return true
  return false
}

export interface ExcludeLocation {
  locationKey?: string
  bagId?: number
  locationType?: LocationTypeId
  locationKeyEndsWith?: string
}

export function getExcludeLocation(rule: {
  action: ItemAction
  destination?: string
}): ExcludeLocation | undefined {
  if (rule.destination == null) return undefined

  if (rule.action === "character-equip" && rule.destination.startsWith("character-worn:")) {
    const charId = rule.destination.slice("character-worn:".length)
    if (charId === "by-priority") return undefined
    return { locationKey: charId, bagId: ESO_BAG_WORN }
  }

  if (rule.action === "companion-equip" && rule.destination.startsWith("companion-worn:")) {
    const name = rule.destination.slice("companion-worn:".length)
    if (name === "by-priority") return undefined
    return { locationKey: `Companion:${name}` }
  }

  if (rule.action === "move-to" || rule.action === "stock") {
    if (rule.destination === "bank") return { locationKey: "Bank" }
    if (rule.destination === "craft-bag") return { locationKey: "CraftBag" }
    if (rule.destination.startsWith("character:")) {
      const charId = rule.destination.slice("character:".length)
      return { locationKey: charId, bagId: ESO_BAG_BACKPACK }
    }
    if (rule.destination === "furniture-vault") return { locationKey: "FurnitureVault" }
    if (rule.destination === "house-storage") return { locationType: "housing-storage" }
    if (rule.destination.startsWith("house-storage:")) {
      const chestId = rule.destination.slice("house-storage:".length)
      return { locationKeyEndsWith: `:${chestId}` }
    }
    if (rule.destination === "guild-bank") return undefined
    if (rule.destination.startsWith("guild-bank:")) {
      const guildName = rule.destination.slice("guild-bank:".length)
      return { locationKey: guildName }
    }
  }

  return undefined
}

export function isAlreadyAtDestination(
  ci: ClassifiedInventoryItem,
  exclude: ExcludeLocation
): boolean {
  if (exclude.locationType != null) {
    return classifyLocation(ci.locationKey) === exclude.locationType
  }
  if (exclude.locationKeyEndsWith != null) {
    return (
      ci.locationKey.startsWith("HouseBank:") &&
      ci.locationKey.endsWith(exclude.locationKeyEndsWith)
    )
  }
  if (exclude.locationKey != null) {
    if (ci.locationKey !== exclude.locationKey) return false
    if (exclude.bagId !== undefined) return ci.bagId === exclude.bagId
    return true
  }
  return false
}
