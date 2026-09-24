import { z } from "zod"

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

export type ResolvedActionSource =
  | "ordered-rule"
  | "item-rule"
  | "item-verdict-outbox"
  | "locked-unlock"
  | "no-match"

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
  marketValue?: number
  replacementValue?: number
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
  junk?: boolean
  junkable?: boolean
  resolvedAction?: string
  resolvedDestination?: string
  resolvedBy?: ResolvedActionSource
  resolvedRuleIndex?: number
  resolvedAt?: number
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
  marketValue?: number
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

export type PriceSource = "ttc" | "ttc-no-table" | "none"

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

const itemSchema = z
  .object({
    itemId: z.number(),
    itemName: z.string(),
    itemLink: z.string(),
    quality: z.number(),
    filterType: z.number(),
    itemType: z.number(),
    specializedItemType: z.number().optional(),
    traitType: z.number(),
    equipType: z.number().optional(),
    weaponType: z.number().optional(),
    armorType: z.number().optional(),
    furnitureCategory: z.string().optional(),
    furnitureCategoryId: z.number().optional(),
    furnitureSubcategoryId: z.number().optional(),
    setId: z.number().optional(),
    isContainer: z.boolean().optional(),
    requiredLevel: z.number(),
    requiredCP: z.number(),
    stackCount: z.number(),
    maxStackSize: z.number().optional(),
    saleAvg: z.number().optional(),
    minPrice: z.number().optional(),
    amountCount: z.number().optional(),
    saleAmountCount: z.number().optional(),
    suggestedPrice: z.number().optional(),
    marketValue: z.number().optional(),
    replacementValue: z.number().optional(),
    merchantValue: z.number().optional(),
    stolen: z.boolean().optional(),
    bound: z.boolean().optional(),
    bopTradeable: z.boolean().optional(),
    questRelevant: z.boolean().optional(),
    reconstructed: z.boolean().optional(),
    transmuted: z.boolean().optional(),
    locked: z.boolean().optional(),
    crafted: z.boolean().optional(),
    known: z.boolean().optional(),
    junk: z.boolean().optional(),
    junkable: z.boolean().optional(),
    resolvedAction: z.string().optional(),
    resolvedDestination: z.string().optional(),
    resolvedBy: z
      .enum(["ordered-rule", "item-rule", "item-verdict-outbox", "locked-unlock", "no-match"])
      .optional(),
    resolvedRuleIndex: z.number().optional(),
    resolvedAt: z.number().optional(),
  })
  .strict()

const placedFurnishingSchema = z
  .object({
    itemName: z.string(),
    quality: z.number(),
    itemLink: z.string(),
    collectibleLink: z.string(),
    saleAvg: z.number().optional(),
    minPrice: z.number().optional(),
    amountCount: z.number().optional(),
    saleAmountCount: z.number().optional(),
    suggestedPrice: z.number().optional(),
    marketValue: z.number().optional(),
  })
  .strict()

const locationSchema = z
  .object({
    bags: z.record(z.number(), z.record(z.number(), itemSchema)),
    bagSizes: z.record(z.number(), z.number()).optional(),
    displayName: z.string(),
    lastScanned: z.number(),
    placedFurnishings: z.record(z.string(), placedFurnishingSchema).optional(),
  })
  .strict()

const currencyBalancesSchema = z.record(z.string(), z.number())

const characterCurrenciesSchema = z
  .object({
    displayName: z.string(),
    lastScanned: z.number(),
    balances: currencyBalancesSchema,
  })
  .strict()

const inventoryCurrenciesSchema = z
  .object({
    characters: z.record(z.string(), characterCurrenciesSchema),
    bank: currencyBalancesSchema.optional(),
    account: currencyBalancesSchema.optional(),
  })
  .strict()

export const inventoryDatabaseSchema = z
  .object({
    locations: z.record(z.string(), locationSchema),
    meta: z
      .object({
        displayName: z.string(),
        worldName: z.string(),
        lastFullScan: z.number(),
        priceSource: z.enum(["ttc", "ttc-no-table", "none"]).optional(),
      })
      .strict(),
    currencies: inventoryCurrenciesSchema.optional(),
    openCooldowns: z.record(z.string(), z.number()).optional(),
    craftingLevels: z.record(z.string(), z.record(z.number(), z.number())).optional(),
    transmuteCrystalCap: z.number().optional(),
    transmuteCrystalAmount: z.number().optional(),
  })
  .strict()
