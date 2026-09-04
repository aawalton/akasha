declare function GetNormalizedPositionForSkyshardId(
  this: void,
  skyshardId?: number
): LuaMultiReturn<[normalizedX: number, normalizedZ: number, isInCurrentMap: boolean]>
declare function GetSkyshardHint(this: void, skyshardId?: number): string
declare function GetSkyshardDiscoveryStatus(
  this: void,
  skyshardId?: number
): SkyshardDiscoveryStatus
declare function GetPromotionalEventCampaignProgress(
  this: void,
  campaignKey?: Id64
): LuaMultiReturn<
  [numActivitiesCompleted: number, capstoneRewardFlags: PromotionalEventRewardFlags]
>
declare function GetPromotionalEventCampaignActivityProgress(
  this: void,
  campaignKey?: Id64,
  activityIndex?: number
): LuaMultiReturn<[progress: number, rewardFlags: PromotionalEventRewardFlags]>
declare function TryAutoTrackNextPromotionalEventCampaign(this: void): Id64
declare function GetTrackedPromotionalEventActivityInfo(
  this: void
): LuaMultiReturn<[campaignKey: Id64, activityIndex: number]>
declare function IsGameCameraActive(this: void): boolean
declare function IsGameCameraUIModeActive(this: void): boolean
declare function GetUnitLevel(this: void, unitTag?: string): number
declare function GetUnitName(this: void, unitTag?: string): string
declare function GetUnitZoneIndex(this: void, unitTag?: string): number | undefined
declare const Logout: (this: void) => void
declare function IsBankOpen(this: void): boolean
declare function GetBankingBag(this: void): Bag
declare function DoesBankHoldCurrency(this: void, bagId?: Bag): boolean
declare function IsGuildBankOpen(this: void): boolean
declare function GetCurrencyAmount(
  this: void,
  currencyType?: CurrencyType,
  currencyLocation?: CurrencyLocation
): number
declare function GetPlayerStoredCurrencyAmount(this: void, currencyType?: CurrencyType): number
declare function GetMaxPossibleCurrency(
  this: void,
  currencyType?: CurrencyType,
  currencyLocation?: CurrencyLocation
): number
declare function GetMaxCurrencyTransfer(
  this: void,
  currencyType?: CurrencyType,
  fromLocation?: CurrencyLocation,
  toLocation?: CurrencyLocation
): number
declare const TransferCurrency: (
  this: void,
  currencyType?: CurrencyType,
  amount?: number,
  fromLocation?: CurrencyLocation,
  toLocation?: CurrencyLocation
) => void
declare function CanInteractWithItem(this: void, bagId?: Bag, slotIndex?: number): boolean
declare const DestroyItem: (this: void, bagId?: Bag, slotIndex?: number) => void
declare function GetBagSize(this: void, bagId?: Bag): number
declare function GetNumBagUsedSlots(this: void, bagId?: Bag): number
declare function GetNumBagFreeSlots(this: void, bagId?: Bag): number
declare function FindFirstEmptySlotInBag(this: void, bagId?: Bag): number | undefined
declare function GetItemFilterTypeInfo(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[itemFilterType: ItemFilterType, ...rest: ItemFilterType[]]>
declare function GetItemLinkFilterTypeInfo(
  this: void,
  itemLink?: string
): LuaMultiReturn<[itemFilterType: ItemFilterType, ...rest: ItemFilterType[]]>
declare function GetItemCooldownInfo(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[remain: number, duration: number]>
declare function IsItemBound(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function IsItemReconstructed(this: void, bagId?: Bag, slotIndex?: number): boolean
declare const EnchantItem: (
  this: void,
  itemToEnchantBagId?: Bag,
  itemToEnchantSlotIndex?: number,
  enchantmentToUseBagId?: Bag,
  enchantmentToUseSlotIndex?: number
) => void
declare function GetAmountSoulGemWouldChargeItem(
  this: void,
  itemToChargeBagId?: Bag,
  itemToChargeSlotIndex?: number,
  soulGemToConsumeBagId?: Bag,
  soulGemToConsumeSlotIndex?: number
): number
declare const ChargeItemWithSoulGem: (
  this: void,
  itemToChargeBagId?: Bag,
  itemToChargeSlotIndex?: number,
  soulGemToConsumeBagId?: Bag,
  soulGemToConsumeSlotIndex?: number
) => void
declare function IsItemSoulGem(
  this: void,
  soulGemType?: SoulGemType,
  bagId?: Bag,
  slotIndex?: number
): boolean
declare function GetChargeInfoForItem(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[charges: number, maxCharges: number]>
declare function DoesItemHaveDurability(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function GetItemCondition(this: void, bagId?: Bag, slotIndex?: number): number
declare function IsItemRepairKit(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function IsItemNonCrownRepairKit(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function IsItemNonGroupRepairKit(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function GetRepairKitTier(this: void, bagId?: Bag, slotIndex?: number): number
declare function GetAmountRepairKitWouldRepairItem(
  this: void,
  itemToRepairBagId?: Bag,
  itemToRepairSlotIndex?: number,
  repairKitToConsumeBagId?: Bag,
  repairKitToConsumeSlotIndex?: number
): number
declare const RepairItemWithRepairKit: (
  this: void,
  itemToRepairBagId?: Bag,
  itemToRepairSlotIndex?: number,
  repairKitToConsumeBagId?: Bag,
  repairKitToConsumeSlotIndex?: number
) => void
declare function GetActiveWeaponPairInfo(
  this: void
): LuaMultiReturn<[activeWeaponPair: ActiveWeaponPair, locked: boolean]>
declare function GetHeldWeaponPair(this: void): ActiveWeaponPair
declare function GetItemLevel(this: void, bagId?: Bag, slotIndex?: number): number
declare function GetItemRequiredLevel(this: void, bagId?: Bag, slotIndex?: number): number
declare function GetItemRequiredChampionPoints(this: void, bagId?: Bag, slotIndex?: number): number
declare function GetItemTrait(this: void, bagId?: Bag, slotIndex?: number): ItemTraitType
declare function GetItemLinkTraitCategory(this: void, itemLink?: string): ItemTraitTypeCategory
declare function GetItemLinkTraitType(this: void, itemLink?: string): ItemTraitType
declare function GetItemCreatorName(this: void, bagId?: Bag, slotIndex?: number): string
declare function GetItemInfo(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<
  [
    icon: string,
    stack: number,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    locked: boolean,
    equipType: EquipType,
    itemStyleId: number,
    functionalQuality: ItemQuality,
    displayQuality: ItemDisplayQuality,
  ]
>
declare function GetItemId(this: void, bagId?: Bag, slotIndex?: number): number
declare function GetItemActorCategory(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): GameplayActorCategory
declare function GetItemSellValueWithBonuses(this: void, bagId?: Bag, slotIndex?: number): number
declare function GetItemCraftingInfo(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<
  [
    usedInCraftingType: TradeskillType,
    itemType: ItemType,
    extraInfo1: number | undefined,
    extraInfo2: number | undefined,
    extraInfo3: number | undefined,
  ]
>
declare function GetItemType(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[itemType: ItemType, specializedItemType: SpecializedItemType]>
declare function GetItemArmorType(this: void, bagId?: Bag, slotIndex?: number): ArmorType
declare function GetItemWeaponType(this: void, bagId?: Bag, slotIndex?: number): WeaponType
declare function GetItemEquipmentFilterType(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): EquipmentFilterType
declare function GetItemUniqueId(this: void, bagId?: Bag, slotIndex?: number): Id64 | undefined
declare function GetItemFunctionalQuality(this: void, bagId?: Bag, slotIndex?: number): ItemQuality
declare function GetItemDisplayQuality(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): ItemDisplayQuality
declare function GetItemEquipType(this: void, bagId?: Bag, slotIndex?: number): EquipType
declare function GetSoulGemItemInfo(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[tier: number, soulGemType: SoulGemType]>
declare function IsItemSellableOnTradingHouse(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function GetNextVirtualBagSlotId(
  this: void,
  lastSlotId?: number | undefined
): number | undefined
declare function CanItemBeVirtual(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function IsItemBoPAndTradeable(this: void, bagId?: Bag, slotIndex?: number): boolean
declare function HasCraftBagAccess(this: void): boolean
declare const TransferToGuildBank: (this: void, sourceBagId?: Bag, sourceSlotIndex?: number) => void
declare const TransferFromGuildBank: (this: void, slotId?: number) => void
declare function HasAnyJunk(this: void, bagId?: Bag, excludeStolenItems?: boolean): boolean
declare const DestroyAllJunk: (this: void) => void
declare const StowAllFurnitureItems: (this: void) => void
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
