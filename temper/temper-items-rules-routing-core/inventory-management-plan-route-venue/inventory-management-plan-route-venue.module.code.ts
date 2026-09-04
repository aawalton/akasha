import type { LocationTypeId } from "@akasha/temper-items-core/location-type-data"
import type {
  ItemAction,
  MoveToDestination,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type {
  PlanItem,
  VenueType,
} from "../inventory-management-plan-types/inventory-management-plan-types.module.code.ts"

export const VENUE_ORDER: VenueType[] = [
  "bank",
  "house-storage",
  "guild-bank",
  "crafting-station",
  "vendor",
  "fence",
  "guild-store",
  "companion-menu",
  "mailbox",
  "backpack",
]

export const VENUE_LABELS: Record<VenueType, string> = {
  backpack: "Backpack",
  bank: "Bank",
  "crafting-station": "Crafting Station",
  vendor: "Merchant",
  fence: "Fence",
  "guild-store": "Guild Store",
  "guild-bank": "Guild Bank",
  "house-storage": "House Storage",
  "companion-menu": "Companion Menu",
  mailbox: "Mailbox",
}

export function buildVenueLabel(venue: VenueType, venueDetail?: string): string {
  return venueDetail ?? VENUE_LABELS[venue]
}

export const LOCATION_ACCESS_VENUE: Record<LocationTypeId, VenueType | null> = {
  character: null,
  bank: "bank",
  craftbag: null,
  "housing-storage": "house-storage",
  companion: "companion-menu",
  guild: "guild-bank",
  house: null,
}

export function getActionVenue(
  action: ItemAction,
  destination: MoveToDestination | undefined,
  stolen: boolean | undefined
): VenueType | null {
  switch (action) {
    case "sell":
      return "vendor"
    case "destroy":
      return stolen ? "fence" : "vendor"
    case "fence-sell":
    case "fence-launder":
      return "fence"
    case "list":
      return "guild-store"
    case "mail":
      return "mailbox"
    case "deconstruct":
    case "refine":
    case "research":
      return "crafting-station"
    case "character-equip":
    case "companion-equip":
      return "companion-menu"
    case "use":
    case "open":
      return null
    case "move-to":
    case "stock": {
      if (destination == null) return null
      if (destination === "bank" || destination === "craft-bag") return "bank"
      if (destination.startsWith("character:")) return "bank"
      if (
        destination === "furniture-vault" ||
        destination === "house-storage" ||
        destination.startsWith("house-storage:")
      )
        return "house-storage"
      if (destination === "guild-bank" || destination.startsWith("guild-bank:")) return "guild-bank"
      return null
    }
    case "nothing":
    case "lock":
    case "unlock":
      return null
    default:
      return assertNever(action)
  }
}

const STORAGE_VENUES: ReadonlySet<VenueType> = new Set(["bank", "house-storage", "guild-bank"])

export const DETAILED_VENUES: ReadonlySet<VenueType> = new Set(["house-storage", "guild-bank"])

function getDepositNote(action: ItemAction, venue: VenueType): string | undefined {
  if ((action === "move-to" || action === "stock") && STORAGE_VENUES.has(venue)) return "Deposit"
  return undefined
}

export function withDepositNote(
  planItem: PlanItem,
  action: ItemAction,
  venue: VenueType
): PlanItem {
  const note = getDepositNote(action, venue)
  return note != null ? { ...planItem, note } : planItem
}
