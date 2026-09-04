import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import { getChestDisplayName } from "../inventory-location-keys/inventory-location-keys.module.code.ts"
import {
  forEachPendingAction,
  getCompiledConfig,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import type { AddonItemAction } from "../inventory-rules-types/inventory-rules-types.module.code.ts"
import { isSavedVariablesReady } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { addToTally } from "../inventory-tally/inventory-tally.module.code.ts"
export type StaticVenueKey =
  | "bank"
  | "house-storage"
  | "furniture-vault"
  | "guild-bank"
  | "crafting-station"
  | "vendor"
  | "fence"
  | "guild-store"
  | "companion-menu"
  | "mailbox"

export const VENUE_ORDER: StaticVenueKey[] = [
  "bank",
  "house-storage",
  "furniture-vault",
  "guild-bank",
  "crafting-station",
  "vendor",
  "fence",
  "guild-store",
  "companion-menu",
  "mailbox",
]

export const VENUE_LABELS: Record<StaticVenueKey, string> = {
  bank: "Bank",
  "house-storage": "House Storage",
  "furniture-vault": "Furniture Vault",
  "guild-bank": "Guild Bank",
  "crafting-station": "Crafting Station",
  vendor: "Merchant",
  fence: "Fence",
  "guild-store": "Guild Store",
  "companion-menu": "Companion Menu",
  mailbox: "Mailbox",
}

export function destinationToVenue(destination: string): string | undefined {
  if (
    destination === "bank" ||
    destination === "craft-bag" ||
    destination.startsWith("character:")
  ) {
    return "bank"
  }
  if (destination === "furniture-vault") {
    return "furniture-vault"
  }
  if (destination === "house-storage") {
    return "house-storage"
  }
  if (destination.startsWith("house-storage:")) {
    return destination
  }
  if (destination === "guild-bank" || destination.startsWith("guild-bank:")) {
    return "guild-bank"
  }
  return undefined
}

function isStaticVenueKey(value: string): value is StaticVenueKey {
  return value in VENUE_LABELS
}

export function resolveVenueLabel(venueKey: string): string {
  if (isStaticVenueKey(venueKey)) {
    return VENUE_LABELS[venueKey]
  }
  if (venueKey.startsWith("house-storage:")) {
    const idStr = venueKey.substring("house-storage:".length)
    const collectibleId = tonumber(idStr)
    if (collectibleId !== undefined && collectibleId > 0) {
      return getChestDisplayName(collectibleId)
    }
    return "House Storage"
  }
  return venueKey
}

export function moveVerb(destination: string): string {
  if (destination.startsWith("character:")) return "withdraw"
  return "deposit"
}

export interface VenuePlan {
  venue: string
  verbs: Array<{ verb: string; count: number }>
}

export function classifyPendingVenue(
  action: AddonItemAction,
  destination: string | undefined,
  isStolen: boolean
): { venue: string; verb: string } | undefined {
  if (action === "sell") return { venue: "vendor", verb: "sell" }
  if (action === "destroy") {
    return isStolen ? { venue: "fence", verb: "sell" } : { venue: "vendor", verb: "sell" }
  }
  if (action === "fence-sell") return { venue: "fence", verb: "sell" }
  if (action === "fence-launder") return { venue: "fence", verb: "launder" }
  if (action === "list") return { venue: "guild-store", verb: "list" }
  if (action === "mail") return { venue: "mailbox", verb: "mail" }
  if (action === "deconstruct") return { venue: "crafting-station", verb: "deconstruct" }
  if (action === "refine") return { venue: "crafting-station", verb: "refine" }
  if (action === "research") return { venue: "crafting-station", verb: "research" }
  if (action === "character-equip" || action === "companion-equip") {
    return { venue: "companion-menu", verb: "equip" }
  }
  if (action === "move-to") {
    const dest = destination ?? "bank"
    const venue = destinationToVenue(dest)
    return venue !== undefined ? { venue, verb: moveVerb(dest) } : undefined
  }
  if (action === "stock") {
    const dest = destination ?? "bank"
    const venue = destinationToVenue(dest)
    return venue !== undefined ? { venue, verb: "stock" } : undefined
  }
  return undefined
}

export function computePlanVenues(): VenuePlan[] | undefined {
  const compiled = getCompiledConfig()
  if (!compiled) return undefined

  const venueCounts = new LuaMap<string, Record<string, number>>()
  const dynamicHouseKeys: string[] = []

  function touch(venue: string): Record<string, number> {
    let counts = venueCounts.get(venue)
    if (counts === undefined) {
      counts = {}
      venueCounts.set(venue, counts)
      if (venue.startsWith("house-storage:")) {
        dynamicHouseKeys.push(venue)
      }
    }
    return counts
  }

  forEachPendingAction(function (
    this: void,
    bagId: number,
    slotIndex: number,
    action: AddonItemAction,
    destination?: string
  ): undefined {
    const classified = classifyPendingVenue(action, destination, IsItemStolen(bagId, slotIndex))
    if (classified !== undefined) addToTally(touch(classified.venue), classified.verb, 1)
  })

  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < bagSize; slot++) {
    if (!IsItemJunk(BAG_BACKPACK, slot)) continue
    const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slot)
    if (stackCount === 0) continue
    if (IsItemStolen(BAG_BACKPACK, slot)) {
      addToTally(touch("fence"), "sell", 1)
    } else {
      addToTally(touch("vendor"), "sell", 1)
    }
  }

  const result: VenuePlan[] = []

  function pushVenue(venueKey: string): undefined {
    const counts = venueCounts.get(venueKey)
    if (counts === undefined) return
    const verbs: Array<{ verb: string; count: number }> = []
    for (const [verb, count] of Object.entries(counts)) {
      verbs.push({ verb, count })
    }
    result.push({ venue: venueKey, verbs })
  }

  for (const staticKey of VENUE_ORDER) {
    pushVenue(staticKey)
    if (staticKey === "house-storage") {
      for (const dynamicKey of dynamicHouseKeys) {
        pushVenue(dynamicKey)
      }
    }
  }

  return result
}

export interface InventoryActionSummary {
  totalSlots: number
  venues: Array<{ label: string; count: number }>
}

export function getInventoryActionSummary(): InventoryActionSummary | undefined {
  if (!isSavedVariablesReady()) return undefined
  const plan = computePlanVenues()
  if (!plan || plan.length === 0) return undefined

  let totalSlots = 0
  const venues: Array<{ label: string; count: number }> = []
  for (const entry of plan) {
    if (entry.venue === "crafting-station") {
      for (const v of entry.verbs) {
        totalSlots += v.count
        const label =
          v.verb === "deconstruct"
            ? "Deconstruct"
            : v.verb === "refine"
              ? "Refine"
              : v.verb === "research"
                ? "Research"
                : resolveVenueLabel(entry.venue)
        venues.push({ label, count: v.count })
      }
    } else {
      let venueCount = 0
      for (const v of entry.verbs) {
        venueCount += v.count
      }
      totalSlots += venueCount
      venues.push({ label: resolveVenueLabel(entry.venue), count: venueCount })
    }
  }

  table.sort(venues, function (this: void, a, b): boolean {
    return a.count > b.count
  })

  return { totalSlots, venues }
}

export function handleTemperPlanCommand(): undefined {
  const compiled = getCompiledConfig()
  if (!compiled) {
    d(`[${ADDON_NAME}] Plan: No rules compiled — sync from Temper web`)
    return
  }

  const plan = computePlanVenues()
  if (!plan || plan.length === 0) {
    d(`[${ADDON_NAME}] Plan: No actions pending`)
    return
  }

  d(`[${ADDON_NAME}] Plan:`)
  for (const entry of plan) {
    const label = resolveVenueLabel(entry.venue)
    const parts: string[] = []
    for (const v of entry.verbs) {
      parts.push(`${v.verb} ${v.count}`)
    }
    d(`  ${label} \u2014 ${parts.join(", ")}`)
  }
}
