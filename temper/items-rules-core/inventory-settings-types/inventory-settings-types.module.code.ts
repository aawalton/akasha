import type { ItemAction } from "../inventory-rule-types/inventory-rule-types.module.code.ts"

const ITEM_DISPLAY_QUALITY_NORMAL = 1
const ITEM_DISPLAY_QUALITY_MAGIC = 2

export interface InventoryEquipmentConfig {
  weaponsAndArmor: ItemAction | false
  jewelry: ItemAction | false
  maxQuality: number
  maxLevel: number
  keepSetItems: boolean
  keepResearchable: boolean
  keepIntricate: boolean
  keepNirnhoned: boolean
  keepCrafted: boolean
  keepCompanion: boolean
  junkSetSourceTypes?: Record<string, boolean>
}

export interface InventoryFurnishingConfig {
  alchResin: ItemAction | false
  bast: ItemAction | false
  cleanPelt: ItemAction | false
  decWax: ItemAction | false
  heartwood: ItemAction | false
  mundRune: ItemAction | false
  ochre: ItemAction | false
  regulus: ItemAction | false
}

export interface InventoryCraftingConfig {
  blacksmithing: ItemAction | false
  blacksmithingRaw: ItemAction | false
  clothing: ItemAction | false
  clothingRaw: ItemAction | false
  woodworking: ItemAction | false
  woodworkingRaw: ItemAction | false
  jewelry: ItemAction | false
  jewelryRaw: ItemAction | false
}

export interface InventoryEnchantingConfig {
  aspectRunes: ItemAction | false
  aspectMaxQuality: number
  essenceRunes: ItemAction | false
  potencyRunes: ItemAction | false
}

export interface InventoryIngredientsConfig {
  mode: "off" | "all" | "unusable"
  excludeRareAdditives: boolean
}

export interface InventoryDailyLoginConfig {
  food: ItemAction | false
  drink: ItemAction | false
  potions: ItemAction | false
  poisons: ItemAction | false
  repairKits: ItemAction | false
  soulGems: ItemAction | false
}

export interface InventoryConfig {
  trash: ItemAction | false
  usedBait: ItemAction | false
  stolenTreasures: ItemAction | false
  nonStolenTreasures: ItemAction | false
  emptyGems: ItemAction | false
  furnishing: InventoryFurnishingConfig
  crafting: InventoryCraftingConfig
  styleMaterials: Record<string, ItemAction | false>
  traitMaterials: Record<string, ItemAction | false>
  potions: ItemAction | false
  poisons: ItemAction | false
  poisonSolvents: ItemAction | false
  treasureMaps: ItemAction | false
  museumPieces: ItemAction | false
  disguises: ItemAction | false
  otherLures: ItemAction | false
  glyphs: ItemAction | false
  glyphsMaxQuality: number
  knownRecipes: ItemAction | false
  knownRecipesMaxQuality: number
  monsterTrophies: ItemAction | false
  rareFish: ItemAction | false
  foodAndDrink: ItemAction | false
  foodAndDrinkMaxQuality: number
  enchanting: InventoryEnchantingConfig
  equipment: InventoryEquipmentConfig
  ingredients: InventoryIngredientsConfig
  dailyLogin: InventoryDailyLoginConfig
  stolenActions: Record<string, ItemAction | false>
  notStolenActions: Record<string, ItemAction | false>
  craftedActions: Record<string, ItemAction | false>
  notCraftedActions: Record<string, ItemAction | false>
  boundActions: Record<string, ItemAction | false>
  notBoundActions: Record<string, ItemAction | false>
  reconstructedActions: Record<string, ItemAction | false>
  notReconstructedActions: Record<string, ItemAction | false>
  transmutedActions: Record<string, ItemAction | false>
  notTransmutedActions: Record<string, ItemAction | false>
  knownActions: Record<string, ItemAction | false>
  notKnownActions: Record<string, ItemAction | false>
  canInspireActions: Record<string, ItemAction | false>
  notCanInspireActions: Record<string, ItemAction | false>
  canResearchActions: Record<string, ItemAction | false>
  notCanResearchActions: Record<string, ItemAction | false>
  canUnlockActions: Record<string, ItemAction | false>
  notCanUnlockActions: Record<string, ItemAction | false>
  canOpenActions: Record<string, ItemAction | false>
  canGiveMaxRewardsActions: Record<string, ItemAction | false>
  traitActions: Record<string, ItemAction | false>
  destinations?: Record<string, string>
}

export type InventoryTimestamps = Record<string, number>

export const INVENTORY_CONFIG_DEFAULTS: InventoryConfig = {
  trash: "sell",
  usedBait: "sell",
  stolenTreasures: false,
  nonStolenTreasures: false,
  emptyGems: false,
  furnishing: {
    alchResin: false,
    bast: false,
    cleanPelt: false,
    decWax: false,
    heartwood: false,
    mundRune: false,
    ochre: false,
    regulus: false,
  },
  crafting: {
    blacksmithing: false,
    blacksmithingRaw: false,
    clothing: false,
    clothingRaw: false,
    woodworking: false,
    woodworkingRaw: false,
    jewelry: false,
    jewelryRaw: false,
  },
  styleMaterials: {},
  traitMaterials: {},
  potions: false,
  poisons: false,
  poisonSolvents: false,
  treasureMaps: false,
  museumPieces: false,
  disguises: false,
  otherLures: false,
  glyphs: false,
  glyphsMaxQuality: ITEM_DISPLAY_QUALITY_NORMAL,
  knownRecipes: false,
  knownRecipesMaxQuality: ITEM_DISPLAY_QUALITY_MAGIC,
  monsterTrophies: false,
  rareFish: false,
  foodAndDrink: false,
  foodAndDrinkMaxQuality: ITEM_DISPLAY_QUALITY_NORMAL,
  enchanting: {
    aspectRunes: false,
    aspectMaxQuality: ITEM_DISPLAY_QUALITY_NORMAL,
    essenceRunes: false,
    potencyRunes: false,
  },
  equipment: {
    weaponsAndArmor: false,
    jewelry: false,
    maxQuality: ITEM_DISPLAY_QUALITY_NORMAL,
    maxLevel: 0,
    keepSetItems: true,
    keepResearchable: true,
    keepIntricate: true,
    keepNirnhoned: true,
    keepCrafted: true,
    keepCompanion: true,
    junkSetSourceTypes: {},
  },
  ingredients: {
    mode: "off",
    excludeRareAdditives: true,
  },
  dailyLogin: {
    food: false,
    drink: false,
    potions: false,
    poisons: false,
    repairKits: false,
    soulGems: false,
  },
  stolenActions: {},
  notStolenActions: {},
  craftedActions: {},
  notCraftedActions: {},
  boundActions: {},
  notBoundActions: {},
  reconstructedActions: {},
  notReconstructedActions: {},
  transmutedActions: {},
  notTransmutedActions: {},
  knownActions: {},
  notKnownActions: {},
  canInspireActions: {},
  notCanInspireActions: {},
  canResearchActions: {},
  notCanResearchActions: {},
  canUnlockActions: {},
  notCanUnlockActions: {},
  canOpenActions: {},
  canGiveMaxRewardsActions: {},
  traitActions: {},
  destinations: {},
}
