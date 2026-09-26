declare function CanStowFurnitureItem(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function DoesBagHaveSpaceFor(
  this: void,
  destinationBagId?: Bag,
  sourceBagId?: Bag,
  sourceSlotIndex?: number
): boolean
declare function IsItemPlayerLocked(this: void, bagId?: Bag, slotIndex?: number): boolean
declare const SetItemIsPlayerLocked: (
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  playerLocked?: boolean
) => void
declare function CanItemBeMarkedAsJunk(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function IsItemJunk(this: void, bagId?: Bag, slotIndex?: number): boolean
declare const SetItemIsJunk: (this: void, bagId?: Bag, slotIndex?: number, junk?: boolean) => void
declare function HasItemInSlot(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function GetItemLink(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  linkStyle?: number
): string
declare function GetItemLinkName(this: void, itemLink?: string): string
declare function GetItemLinkItemId(this: void, itemLink?: string): number
declare function GetItemLinkItemSetCollectionSlot(this: void, itemLink?: string): Id64
declare function GetItemLinkIcon(this: void, itemLink?: string): string
declare function GetItemLinkItemType(
  this: void,
  itemLink?: string
): LuaMultiReturn<[itemType: ItemType, specializedItemType: SpecializedItemType]>
declare function GetItemLinkItemUseType(this: void, itemLink?: string): ItemUseType
declare function GetItemLinkItemUseReferenceId(this: void, itemLink?: string): number
declare function GetItemLinkArmorType(this: void, itemLink?: string): ArmorType
declare function GetItemLinkWeaponType(this: void, itemLink?: string): WeaponType
declare function GetItemLinkWeaponPower(this: void, itemLink?: string): number
declare function GetItemLinkArmorRating(
  this: void,
  itemLink?: string,
  considerCondition?: boolean
): number
declare function GetItemLinkRequiredLevel(this: void, itemLink?: string): number
declare function GetItemLinkRequiredChampionPoints(this: void, itemLink?: string): number
declare function GetItemLinkValue(
  this: void,
  itemLink?: string,
  considerCondition?: boolean
): number
declare function GetItemLinkEnchantInfo(
  this: void,
  itemLink?: string
): LuaMultiReturn<[hasCharges: boolean, enchantHeader: string, enchantDescription: string]>
declare function GetItemLinkDefaultEnchantId(this: void, itemLink?: string): number
declare function GetItemLinkAppliedEnchantId(this: void, itemLink?: string): number
declare function GetItemLinkFinalEnchantId(this: void, itemLink?: string): number
declare function GetItemLinkOnUseAbilityInfo(
  this: void,
  itemLink?: string
): LuaMultiReturn<
  [
    hasAbility: boolean,
    abilityHeader: string,
    abilityDescription: string,
    cooldown: number,
    hasScaling: boolean,
    minLevel: number,
    maxLevel: number,
    isChampionPoints: boolean,
    remainingCooldown: number,
  ]
>
declare function GetItemLinkTraitOnUseAbilityInfo(
  this: void,
  itemLink?: string,
  index?: number
): LuaMultiReturn<
  [
    hasAbility: boolean,
    abilityDescription: string,
    cooldown: number,
    hasScaling: boolean,
    minLevel: number,
    maxLevel: number,
    isChampionPoints: boolean,
  ]
>
declare function GetItemLinkTraitInfo(
  this: void,
  itemLink?: string
): LuaMultiReturn<[traitType: ItemTraitType, traitDescription: string]>
declare function GetItemLinkSetInfo(
  this: void,
  itemLink?: string,
  equipped?: boolean
): LuaMultiReturn<
  [
    hasSet: boolean,
    setName: string,
    numBonuses: number,
    numNormalEquipped: number,
    maxEquipped: number,
    setId: number,
    numPerfectedEquipped: number,
  ]
>
declare function GetItemLinkSetBonusInfo(
  this: void,
  itemLink?: string,
  equipped?: boolean,
  index?: number
): LuaMultiReturn<[numRequired: number, bonusDescription: string, isPerfectedBonus: boolean]>
declare function GetItemSetInfo(
  this: void,
  itemSetId?: number
): LuaMultiReturn<
  [
    hasSet: boolean,
    setName: string,
    numBonuses: number,
    numNormalEquipped: number,
    numPerfectedEquipped: number,
    maxEquipped: number,
  ]
>
declare function GetItemSetBonusInfo(
  this: void,
  itemSetId?: number,
  index?: number
): LuaMultiReturn<[numRequired: number, bonusDescription: string, isPerfectedBonus: boolean]>
declare function IsItemLinkSetCollectionPiece(this: void, itemLink?: string): boolean
declare function GetItemLinkNumContainerSetIds(this: void, itemLink?: string): number
declare function GetItemLinkContainerSetInfo(
  this: void,
  itemLink?: string,
  containerSetIndex?: number
): LuaMultiReturn<
  [
    hasSet: boolean,
    setName: string,
    numBonuses: number,
    numNormalEquipped: number,
    maxEquipped: number,
    setId: number,
    numPerfectedEquipped: number,
  ]
>
declare function GetItemLinkFlavorText(this: void, itemLink?: string): string
declare function IsItemLinkCrafted(this: void, itemLink?: string): boolean
declare function GetItemLinkFunctionalQuality(this: void, itemLink?: string): ItemQuality
declare function GetItemLinkDisplayQuality(this: void, itemLink?: string): ItemDisplayQuality
declare function IsItemLinkUnique(this: void, itemLink?: string): boolean
declare function IsItemLinkUniqueEquipped(this: void, itemLink?: string): boolean
declare function GetItemLinkEquipType(this: void, itemLink?: string): EquipType
declare function GetItemLinkCraftingSkillType(this: void, itemLink?: string): TradeskillType
declare function GetItemLinkEnchantingRuneName(
  this: void,
  itemLink?: string
): LuaMultiReturn<[known: boolean | undefined, name: string | undefined]>
declare function GetItemLinkEnchantingRuneClassification(
  this: void,
  itemLink?: string
): EnchantingRuneClassification
declare function GetItemLinkRequiredCraftingSkillRank(this: void, itemLink?: string): number
declare function IsItemLinkBound(this: void, itemLink?: string): boolean
declare function GetItemLinkBindType(this: void, itemLink?: string): BindType
declare function GetItemLinkGlyphMinLevels(
  this: void,
  itemLink?: string
): LuaMultiReturn<[minLevel: number | undefined, minChampionPoints: number | undefined]>
declare function IsItemLinkBookKnown(this: void, itemLink?: string): boolean
declare function IsItemLinkRecipeKnown(this: void, itemLink?: string): boolean
declare function GetItemLinkRecipeResultItemLink(
  this: void,
  itemLink?: string,
  linkStyle?: number
): string
declare function GetItemLinkRecipeNumIngredients(this: void, itemLink?: string): number
declare function GetItemLinkRecipeIngredientInfo(
  this: void,
  itemLink?: string,
  index?: number
): LuaMultiReturn<
  [ingredientName: string, amountInInventoryAndBank: number, amountRequired: number]
>
declare function GetItemLinkRecipeIngredientItemLink(
  this: void,
  itemLink?: string,
  index?: number,
  linkStyle?: number
): string
declare function GetItemLinkReagentTraitInfo(
  this: void,
  itemLink?: string,
  index?: number
): LuaMultiReturn<[known: boolean | undefined, name: string | undefined]>
declare function GetItemLinkItemStyle(this: void, itemLink?: string): number
declare function GetItemLinkRefinedMaterialItemLink(
  this: void,
  itemLink?: string,
  linkStyle?: number
): string
declare function IsItemLinkReconstructed(this: void, itemLink?: string): boolean
declare function IsItemLinkStolen(this: void, itemLink?: string): boolean
declare function CanItemLinkBeUsedToLearn(this: void, itemLink?: string): boolean
declare function IsItemLinkContainer(this: void, itemLink?: string): boolean
declare function GetItemLinkStacks(
  this: void,
  itemLink?: string
): LuaMultiReturn<
  [
    stackCountBackpack: number,
    stackCountBank: number,
    stackCountCraftBag: number,
    stackCountHouseBanks: number,
    stackCountFurnitureVault: number,
    stackCountVengeanceBag: number,
  ]
>
declare function GetItemLinkInventoryCount(
  this: void,
  itemLink?: string,
  countType?: InventoryCountBagOption
): number
declare function CanItemLinkBeVirtual(this: void, itemLink?: string): boolean
declare function GetItemLinkFurnitureDataId(this: void, itemLink?: string): number
declare function GetItemLinkGrantedRecipeIndices(
  this: void,
  itemLink?: string
): LuaMultiReturn<[recipeListIndex: number | undefined, recipeIndex: number | undefined]>
declare function GetItemLinkActorCategory(this: void, itemLink?: string): GameplayActorCategory
declare function GetItemLinkTradingHouseItemSearchName(this: void, itemLink?: string): string
declare function GetItemLinkContainerCollectibleId(this: void, itemLink?: string): number
declare function IsItemStolen(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function AreAnyItemsStolen(this: void, bagId?: Bag): boolean
declare const StackBag: (this: void, bagId?: Bag) => void
declare function GetItemLinkNumItemTags(this: void, itemLink?: string): number
declare function GetItemLinkItemTagInfo(
  this: void,
  itemLink?: string,
  itemTagIndex?: number
): LuaMultiReturn<[itemTagDescription: string, itemTagCategory: ItemTagCategory]>
declare function GetNumCrownGemsFromItemManualGemification(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[itemsRequired: number, gemsAwarded: number]>
declare function IsItemFromCrownCrate(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function GetItemBindType(this: void, bagId?: Bag, slotIndex?: number): BindType
declare function IsHouseBankBag(this: void, bagId?: Bag): boolean
declare function IsFurnitureVault(this: void, bagId?: Bag): boolean
declare function GetCurrentBankUpgrade(this: void): number
declare function GetMaxBankUpgrade(this: void): number
declare function IsCurrencyValid(this: void, currencyType?: CurrencyType): boolean
declare function CanCurrencyBeStoredInLocation(
  this: void,
  currencyType?: CurrencyType,
  currencyLocation?: CurrencyLocation
): boolean
declare function GetCurrencyName(
  this: void,
  currencyType?: CurrencyType,
  isSingular?: boolean,
  isLower?: boolean
): string
declare function GetCurrencyDescription(this: void, currencyType?: CurrencyType): string
declare function GetCurrencyKeyboardIcon(
  this: void,
  currencyType?: CurrencyType
): LuaMultiReturn<[iconPath: string, percentOfLineSize: number]>
declare function GetCurrencyGamepadIcon(
  this: void,
  currencyType?: CurrencyType
): LuaMultiReturn<[iconPath: string, percentOfLineSize: number]>
declare function IsCollectibleBlacklisted(this: void, collectibleId?: number): boolean
declare function GetNumCollectibleCategories(this: void): number
declare function GetCollectibleCategoryInfo(
  this: void,
  topLevelIndex?: number
): LuaMultiReturn<
  [
    name: string,
    numSubCatgories: number,
    numCollectibles: number,
    unlockedCollectibles: number,
    totalCollectibles: number,
    hidesLocked: boolean,
  ]
>
declare function GetCollectibleCategoryId(
  this: void,
  topLevelIndex?: number,
  subCategoryIndex?: number | undefined
): number
declare function GetCollectibleSubCategoryInfo(
  this: void,
  topLevelIndex?: number,
  subCategoryIndex?: number
): LuaMultiReturn<
  [name: string, numCollectibles: number, unlockedCollectibles: number, totalCollectibles: number]
>
declare function GetCollectibleId(
  this: void,
  topLevelIndex?: number,
  categoryIndex?: number | undefined,
  collectibleIndex?: number
): number
declare function GetCollectibleInfo(
  this: void,
  collectibleId?: number
): LuaMultiReturn<
  [
    name: string,
    description: string,
    icon: string,
    deprecatedLockedIcon: string,
    unlocked: boolean,
    purchasable: boolean,
    isActive: boolean,
    categoryType: CollectibleCategoryType,
    hint: string,
  ]
>
declare function GetCollectibleDescription(this: void, collectibleId?: number): string
declare function GetCollectibleCategoryType(
  this: void,
  collectibleId?: number
): CollectibleCategoryType
declare function GetCollectibleIcon(this: void, collectibleId?: number): string
declare function GetCategoryInfoFromCollectibleId(
  this: void,
  collectibleId?: number
): LuaMultiReturn<
  [
    topLevelIndex: number | undefined,
    categoryIndex: number | undefined,
    collectibleIndex: number | undefined,
  ]
>
declare function GetCategoryInfoFromCollectibleCategoryId(
  this: void,
  collectibleCategoryId?: number
): LuaMultiReturn<[topLevelIndex: number | undefined, categoryIndex: number | undefined]>
declare function GetTotalCollectiblesByCategoryType(
  this: void,
  collectibleCategoryType?: CollectibleCategoryType
): number
declare function GetCollectibleIdFromType(
  this: void,
  collectibleCategoryType?: CollectibleCategoryType,
  index?: number
): number
declare function IsCollectibleBlocked(
  this: void,
  collectibleId?: number,
  actorCategory?: GameplayActorCategory
): boolean
declare function GetCollectibleBlockReason(
  this: void,
  collectibleId?: number,
  actorCategory?: GameplayActorCategory
): CollectibleUsageBlockReason
declare function IsCollectibleUsable(
  this: void,
  collectibleId?: number,
  actorCategory?: GameplayActorCategory
): boolean
declare function GetCollectibleHint(this: void, collectibleId?: number): string
declare const UseCollectible: (
  this: void,
  collectibleId?: number,
  actorCategory?: GameplayActorCategory
) => void
declare function GetCollectibleLink(this: void, collectibleId?: number, linkStyle?: number): string
declare function GetCollectibleIdFromLink(this: void, link?: string): number | undefined
declare function GetCollectibleNickname(this: void, collectibleId?: number): string
declare function IsCollectibleUnlocked(this: void, collectibleId?: number): boolean
declare const SetOrClearCollectibleUserFlag: (
  this: void,
  collectibleId?: number,
  userFlag?: CollectibleUserFlags,
  isSet?: boolean
) => void
declare function GetCollectibleUserFlags(this: void, collectibleId?: number): CollectibleUserFlags
declare function IsCollectibleActive(
  this: void,
  collectibleId?: number,
  actorCategory?: GameplayActorCategory
): boolean
declare function IsCollectibleOwnedByDefId(this: void, collectibleId?: number): boolean
declare function GetFurnitureVaultCollectibleId(this: void): number
declare function GetActiveCollectibleByType(
  this: void,
  categoryType?: CollectibleCategoryType,
  actorCategory?: GameplayActorCategory
): number
declare function GetCollectibleCooldownAndDuration(
  this: void,
  collectibleId?: number
): LuaMultiReturn<[cooldownRemaining: number, cooldownDuration: number]>
declare function GetCollectibleFurnitureDataId(this: void, collectibleId?: number): number
declare function GetCollectibleReferenceId(this: void, collectibleId?: number): number
declare function GetCollectibleForBag(this: void, bagId?: Bag): number
declare function CanCombinationFragmentBeUnlocked(this: void, collectibleId?: number): boolean
declare function IsCollectibleTributePatronBookCardUpgraded(
  this: void,
  patronId?: number,
  cardIndex?: number
): boolean
