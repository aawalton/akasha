export const ESO_ITEMTYPE_RECIPE = 29

export const ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER = 61

export const ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK = 60

export const ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT = 73

export const ESO_ITEMTYPE_CONTAINER = 18

export function isKnowledgeItem(
  itemType: number | undefined,
  specializedItemType: number | undefined
): boolean {
  return (
    itemType === ESO_ITEMTYPE_RECIPE ||
    itemType === ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT ||
    specializedItemType === ESO_SPECIALIZED_ITEMTYPE_MOTIF_BOOK ||
    specializedItemType === ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER
  )
}

export interface InventoryItemData {
  itemId: number
  itemName: string
  itemLink: string
  quality: number
  filterType: number
  itemType: number
  specializedItemType?: number
  traitType: number
  equipType?: number
  weaponType?: number
  armorType?: number
  furnitureCategory?: string
  furnitureCategoryId?: number
  furnitureSubcategoryId?: number
  setId?: number
  isContainer?: boolean
  requiredLevel: number
  requiredCP: number
  stackCount: number
  maxStackSize?: number
  saleAvg?: number
  minPrice?: number
  amountCount?: number
  saleAmountCount?: number
  suggestedPrice?: number
  estimatedValue?: number
  replacementCost?: number
  merchantValue?: number
  stolen?: boolean
  bound?: boolean
  bopTradeable?: boolean
  questRelevant?: boolean
  reconstructed?: boolean
  transmuted?: boolean
  locked?: boolean
  crafted?: boolean
  known?: boolean
}

export interface PlacedFurnishingData {
  itemName: string
  quality: number
  itemLink: string
  collectibleLink: string
  saleAvg?: number
  minPrice?: number
  amountCount?: number
  saleAmountCount?: number
  suggestedPrice?: number
  estimatedValue?: number
}

export interface InventoryLocationData {
  bags: Record<number, Record<number, InventoryItemData>>
  bagSizes?: Record<number, number>
  displayName: string
  lastScanned: number
  placedFurnishings?: Record<string, PlacedFurnishingData>
}

export type CurrencyBalances = Record<string, number>

export interface CharacterCurrencies {
  displayName: string
  lastScanned: number
  balances: CurrencyBalances
}

export interface InventoryCurrencies {
  characters: Record<string, CharacterCurrencies>
  bank?: CurrencyBalances
  account?: CurrencyBalances
}

export type PriceSource = "ttc" | "none"

export interface InventoryDatabase {
  locations: Record<string, InventoryLocationData>
  meta: {
    displayName: string
    worldName: string
    lastFullScan: number
    priceSource?: PriceSource
  }
  currencies?: InventoryCurrencies
  openCooldowns?: Record<string, number>
  craftingLevels?: Record<string, Record<number, number>>
  transmuteCrystalCap?: number
  transmuteCrystalAmount?: number
}
