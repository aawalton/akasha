export type InventoryLocationConditionId = string

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

export type CharacterId = string & { readonly __brand: "CharacterId" }

export type ItemKey =
  | { kind: "recipe"; resultItemId: number }
  | { kind: "motif"; styleId: number; chapterId: number | null }
  | { kind: "script"; scriptId: number }
  | { kind: "consumable"; itemId: number }

export type LookupResult<T> = T | "unknown"

export interface WantedEquipmentFacts {
  readonly equipType: number
  readonly traitType: number
  readonly quality: number
  readonly armorType?: number
  readonly weaponType?: number
}

export interface EvalEnv {
  readonly isKnownByCharacter: (itemKey: ItemKey, charId: string) => LookupResult<boolean>
  readonly isKnownByAnyCharacter: (itemKey: ItemKey) => LookupResult<boolean>
  readonly isTraitResearched: (
    charId: string,
    craftingType: number,
    traitName: string
  ) => LookupResult<boolean>
  readonly isCraftingRankBelowCap: (charId: string, craftingType: number) => LookupResult<boolean>
  readonly matchesWantedEquipment: (facts: WantedEquipmentFacts) => LookupResult<boolean>
  readonly matchesWantedCompanionEquipment: (facts: WantedEquipmentFacts) => LookupResult<boolean>
  readonly isCompanionWornSlotFilled: (
    companionName: string,
    facts: WantedEquipmentFacts
  ) => LookupResult<boolean>
  readonly findCharacterForWantedEquipment: (
    facts: WantedEquipmentFacts
  ) => LookupResult<string | undefined>
  readonly findCompanionForWantedEquipment: (
    facts: WantedEquipmentFacts
  ) => LookupResult<string | undefined>
  readonly getConsumableStock: (itemId: number, charId: string) => LookupResult<number>
  readonly getConsumableWanters: (itemId: number) => LookupResult<ReadonlyArray<string>>
  readonly getBankStock: (itemId: number) => LookupResult<number>
  readonly getCooldownGroup: (itemId: number) => LookupResult<string | null>
  readonly isCooldownExpired: (groupKey: string) => LookupResult<boolean>
  readonly getTransmuteCrystalAmount: () => LookupResult<number>
  readonly getTransmuteCrystalCap: () => LookupResult<number>
  readonly getKnownScripts: (charId: string) => LookupResult<ReadonlySet<number>>
  readonly getTotalScriptCount: () => LookupResult<number>
  readonly getCharacterPriority: () => LookupResult<ReadonlyArray<string>>
  readonly getCurrentCharacter: () => LookupResult<string>
  readonly getAllCharacters: () => LookupResult<ReadonlyArray<string>>
}

export interface ItemFacts {
  readonly itemId: number
  readonly itemName: string
  readonly itemLink: string
  readonly stackCount?: number
  readonly maxStackSize?: number
  readonly quality?: number
  readonly requiredLevel?: number
  readonly requiredCP?: number
  readonly itemType?: number
  readonly specializedItemType?: number
  readonly filterType?: number
  readonly traitType?: number
  readonly equipType?: number
  readonly weaponType?: number
  readonly armorType?: number
  readonly furnitureCategoryId?: number
  readonly furnitureSubcategoryId?: number
  readonly setId?: number
  readonly isContainer?: boolean
  readonly isStolen?: boolean
  readonly isBound?: boolean
  readonly isBoPTradeable?: boolean
  readonly isQuestRelevant?: boolean
  readonly isCrafted?: boolean
  readonly isLocked?: boolean
  readonly isReconstructed?: boolean
  readonly isTransmuted?: boolean
  readonly estimatedValue?: number
  readonly merchantValue?: number
  readonly replacementCost?: number
  readonly known?: boolean
  readonly isKnowledgeItem?: boolean
  readonly location?: InventoryLocationConditionId
  readonly potionEffectMetricIds?: readonly string[]
  readonly itemKey?: ItemKey
  readonly categoryNodeIds?: ReadonlyArray<string>
}

export interface RouteStep {
  characterId: string
  venue: string
  venueDetail?: string
  storageKey?: string
  operation: "retrieve" | "deposit" | "act"
  item: unknown
  itemId: number
}

export type PageAccessClient = unknown

export interface MotifBookId {
  readonly styleId: number
  readonly chapterId: number | null
}

export interface LoreBookEntry {
  readonly bookIndex: number
  readonly name: string
}

export interface LoreCollectionEntry {
  readonly collectionIndex: number
  readonly name: string
  readonly books: readonly LoreBookEntry[]
}

export interface LoreCategoryEntry {
  readonly categoryIndex: number
  readonly name: string
  readonly collections: readonly LoreCollectionEntry[]
}
