import type { ItemAction } from "@akasha/temper-items-rules-core/inventory-rule-types"

export type VenueType =
  | "backpack"
  | "bank"
  | "crafting-station"
  | "vendor"
  | "fence"
  | "guild-store"
  | "guild-bank"
  | "house-storage"
  | "companion-menu"
  | "mailbox"

export interface PlanItem {
  itemId: number
  itemName: string
  stackCount: number
  quality: number
  action: ItemAction
  note?: string
  value?: number
  marketValue?: number
  replacementValue?: number
  merchantValue?: number
  saleAvg?: number
  minPrice?: number
  amountCount?: number
  saleAmountCount?: number
  suggestedPrice?: number
}

export interface ActionGroup {
  label: string
  items: readonly PlanItem[]
  slotCount: number
  totalValue?: number
}

export interface VenueStop {
  venue: VenueType
  label: string
  venueCategory?: string
  actionGroups: readonly ActionGroup[]
  slotCount: number
  totalValue?: number
}

export interface CharacterSession {
  characterId: string
  characterName: string
  venues: readonly VenueStop[]
  totalSlots: number
  visitNumber?: number
  totalValue?: number
}

export interface ManagementPlan {
  sessions: readonly CharacterSession[]
  totalCharacterSwitches: number
  totalVenueVisits: number
  totalSlots: number
  totalValue?: number
}

export interface RouteStep {
  characterId: string
  venue: VenueType
  venueDetail?: string
  storageKey?: string
  operation: "retrieve" | "deposit" | "act"
  item: PlanItem
  itemId: number
}
