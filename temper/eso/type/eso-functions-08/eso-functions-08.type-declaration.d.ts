declare function GetNormalizedPositionForSkyshardId(
  this: void,
  skyshardId?: number
): LuaMultiReturn<[normalizedX: number, normalizedZ: number, isInCurrentMap: boolean]>
declare function GetSkyshardHint(this: void, skyshardId?: number): string
declare function GetSkyshardDiscoveryStatus(
  this: void,
  skyshardId?: number
): SkyshardDiscoveryStatus
declare function RequestGroupFinderSearch(this: void): number | undefined
declare const SetGroupFinderFilterCategory: (
  this: void,
  category?: GroupFinderCategory,
  isCancelable?: boolean
) => void
declare const SetGroupFinderFilterPrimaryOptionByIndex: (
  this: void,
  index?: number,
  setSelection?: boolean
) => void
declare const SetGroupFinderFilterEnforceRoles: (this: void, setState?: boolean) => void
declare function GetGroupFinderSearchNumListings(this: void): number
declare function GetGroupFinderSearchListingCategoryByIndex(
  this: void,
  index?: number
): GroupFinderCategory
declare function GetGroupFinderSearchListingOptionsSelectionTextByIndex(
  this: void,
  index?: number
): LuaMultiReturn<[primaryOption: string, secondaryOption: string]>
declare function GetGroupFinderSearchListingTitleByIndex(this: void, index?: number): string
declare function GetGroupFinderSearchListingDescriptionByIndex(this: void, index?: number): string
declare function GetGroupFinderSearchListingLeaderDisplayNameByIndex(
  this: void,
  index?: number
): string
declare function GetGroupFinderSearchListingNumRolesByIndex(this: void, index?: number): number
declare function GetGroupFinderSearchListingRoleStatusCount(
  this: void,
  index?: number,
  role?: LFGRole
): LuaMultiReturn<[desiredCount: number, attainedCount: number]>
declare function IsGroupFinderSearchOnCooldown(this: void): boolean
declare const UpdateGroupFinderUserTypeGroupListingOptions: (
  this: void,
  userType?: GroupFinderGroupListingUserType
) => void
declare const SetGroupFinderUserTypeGroupListingCategory: (
  this: void,
  userType?: GroupFinderGroupListingUserType,
  category?: GroupFinderCategory
) => void
declare const SetGroupFinderUserTypeGroupListingPrimaryOption: (
  this: void,
  userType?: GroupFinderGroupListingUserType,
  index?: number
) => void
declare const SetGroupFinderUserTypeGroupListingSecondaryOptionDefault: (
  this: void,
  userType?: GroupFinderGroupListingUserType
) => void
declare const SetGroupFinderUserTypeGroupListingSecondaryOption: (
  this: void,
  userType?: GroupFinderGroupListingUserType,
  index?: number
) => void
declare function GetGroupFinderUserTypeGroupListingNumSecondaryOptions(
  this: void,
  userType?: GroupFinderGroupListingUserType
): number
declare function GetGroupFinderUserTypeGroupListingSecondaryOptionByIndex(
  this: void,
  userType?: GroupFinderGroupListingUserType,
  index?: number
): LuaMultiReturn<[name: string, setState: boolean]>
declare const SetGroupFinderUserTypeGroupListingTitle: (
  this: void,
  userType?: GroupFinderGroupListingUserType,
  name?: string
) => void
declare const SetGroupFinderUserTypeGroupListingDescription: (
  this: void,
  userType?: GroupFinderGroupListingUserType,
  name?: string
) => void
declare const SetGroupFinderUserTypeGroupListingGroupSize: (
  this: void,
  userType?: GroupFinderGroupListingUserType,
  groupSize?: GroupFinderGroupSize
) => void
declare function GetGroupFinderUserTypeGroupListingGroupSize(
  this: void,
  userType?: GroupFinderGroupListingUserType
): GroupFinderGroupSize
declare function GetGroupFinderUserTypeGroupSizeIterationBegin(
  this: void,
  userType?: GroupFinderGroupListingUserType
): GroupFinderGroupSize
declare function GetGroupFinderUserTypeGroupSizeIterationEnd(
  this: void,
  userType?: GroupFinderGroupListingUserType
): GroupFinderGroupSize
declare const SetGroupFinderUserTypeGroupListingRequiresChampion: (
  this: void,
  userType?: GroupFinderGroupListingUserType,
  requiresChampion?: boolean
) => void
declare const SetGroupFinderUserTypeGroupListingAutoAcceptRequests: (
  this: void,
  userType?: GroupFinderGroupListingUserType,
  autoAcceptRequests?: boolean
) => void
declare const SetGroupFinderUserTypeGroupListingEnforceRoles: (
  this: void,
  userType?: GroupFinderGroupListingUserType,
  enforceRoles?: boolean
) => void
declare const GroupFinderUserTypeGroupListingClearDesiredRoles: (
  this: void,
  userType?: GroupFinderGroupListingUserType
) => void
declare const SetGroupFinderUserTypeGroupListingRoleCount: (
  this: void,
  userType?: GroupFinderGroupListingUserType,
  role?: LFGRole,
  count?: number
) => void
declare function IsGroupFinderRoleChangeRequested(this: void): boolean
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
declare function GetReferenceTrackIndex(
  this: void,
  rewardTrackType?: RewardTrackType,
  referenceTrackId?: number
): number | undefined
declare function GetRewardTrackIdFromReferenceTrackId(
  this: void,
  rewardTrackType?: RewardTrackType,
  referenceTrackId?: number
): number
declare function GetInfoForRewardTrack(
  this: void,
  rewardTrackType?: RewardTrackType,
  referenceTrackIndex?: number
): LuaMultiReturn<
  [trackId: number, currentTier: number, progressToNextTier: number, endTime: number]
>
declare function GetRewardTrackRewardClaimedState(
  this: void,
  rewardTrackType?: RewardTrackType,
  referenceTrackIndex?: number,
  tier?: number,
  rewardTrackComponent?: RewardTrackComponent,
  rewardIndex?: number
): LuaMultiReturn<[isClaimed: boolean, isFallback: boolean, isInfinitelyRepeatableReward: boolean]>
declare const ClaimRewardTrackReward: (
  this: void,
  rewardTrackType?: RewardTrackType,
  referenceTrackIndex?: number,
  tier?: number,
  rewardTrackComponent?: RewardTrackComponent,
  rewardIndex?: number
) => void
declare function HasAccessToRewardTrackComponent(
  this: void,
  rewardTrackType?: RewardTrackType,
  referenceTrackIndex?: number,
  rewardTrackComponent?: RewardTrackComponent
): boolean
declare function GetTotalNumTiersForRewardTrack(this: void, rewardTrackId?: number): number
declare function GetNumRewardsAtRewardTrackTier(
  this: void,
  rewardTrackId?: number,
  tierIndex?: number,
  rewardTrackComponent?: RewardTrackComponent
): number
declare function GetTamrielTomesRewardInfo(
  this: void,
  rewardTrackId?: number,
  tierIndex?: number,
  rewardTrackComponent?: RewardTrackComponent,
  rewardIndex?: number
): LuaMultiReturn<
  [
    rewardId: number,
    overrideAmount: number,
    cost: number,
    displayQuality: ItemDisplayQuality,
    hideQuality: boolean,
  ]
>
declare function IsTamrielTomesEnabled(this: void): boolean
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
