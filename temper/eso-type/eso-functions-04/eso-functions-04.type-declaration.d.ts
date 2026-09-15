declare function GetNormalizedWorldPosition(
  this: void,
  zoneId?: number,
  worldX?: number,
  worldY?: number,
  worldZ?: number
): LuaMultiReturn<[normalizedX: number, normalizedY: number]>
declare const PingMap: (
  this: void,
  pingType?: MapDisplayPinType,
  mapDisplayType?: MapDisplayType,
  normalizedX?: number,
  normalizedZ?: number,
  mapDisplay?: unknown
) => void
declare function SetPlayerWaypointByWorldLocation(
  this: void,
  worldX?: number,
  worldY?: number,
  worldZ?: number
): boolean
declare const RemovePlayerWaypoint: (this: void) => void
declare const RemoveRallyPoint: (this: void) => void
declare function GenerateMasterWritBaseText(this: void, itemLink?: string): string
declare function GenerateMasterWritRewardText(this: void, itemLink?: string): string
declare function GetNumPOIs(this: void, zoneIndex?: number): number
declare function GetPOIInfo(
  this: void,
  zoneIndex?: number,
  poiIndex?: number
): LuaMultiReturn<
  [
    objectiveName: string,
    objectiveLevel: number,
    startDescription: string,
    finishedDescription: string,
  ]
>
declare function GetPOIType(this: void, zoneIndex?: number, poiIndex?: number): PointOfInterestType
declare function GetPOIMapInfo(
  this: void,
  zoneIndex?: number,
  poiIndex?: number
): LuaMultiReturn<
  [
    normalizedX: number,
    normalizedZ: number,
    poiPinType: MapDisplayPinType,
    icon: string,
    isShownInCurrentMap: boolean,
    linkedCollectibleIsLocked: boolean,
    isDiscovered: boolean,
    isNearby: boolean,
  ]
>
declare function IsInCyrodiil(this: void): boolean
declare function IsInImperialCity(this: void): boolean
declare function IsInJusticeEnabledZone(this: void): boolean
declare function CanLeaveCurrentLocationViaTeleport(this: void): boolean
declare function GetPOIZoneCompletionType(
  this: void,
  zoneIndex?: number,
  poiIndex?: number
): ZoneCompletionType
declare function GetPOIInstanceType(this: void, zoneIndex?: number, poiIndex?: number): number
declare function GetCadwellProgressionLevel(this: void): CadwellProgressionLevel
declare function GetNumZonesForCadwellProgressionLevel(
  this: void,
  cadwellProgressionLevel?: CadwellProgressionLevel
): number
declare function GetCadwellZoneInfo(
  this: void,
  cadwellProgressionLevel?: CadwellProgressionLevel,
  zoneIndex?: number
): LuaMultiReturn<[zoneName: string, zoneDescription: string, zoneOrder: number]>
declare function GetNumPOIsForCadwellProgressionLevelAndZone(
  this: void,
  cadwellProgressionLevel?: CadwellProgressionLevel,
  zoneIndex?: number
): number
declare function GetCadwellZonePOIInfo(
  this: void,
  cadwellProgressionLevel?: CadwellProgressionLevel,
  zoneIndex?: number,
  poiIndex?: number
): LuaMultiReturn<
  [
    poiName: string,
    poiOpeningText: string,
    poiClosingText: string,
    poiOrder: number,
    discovered: boolean,
    completed: boolean,
  ]
>
declare function GetPlayerActiveSubzoneName(this: void): string
declare function GetPlayerActiveZoneName(this: void): string
declare function GetPlayerLocationName(this: void): string
declare function IsPlayerInAvAWorld(this: void): boolean
declare function IsActiveWorldBattleground(this: void): boolean
declare function GetNumFastTravelNodes(this: void): number
declare function GetFastTravelNodeInfo(
  this: void,
  nodeIndex?: number
): LuaMultiReturn<
  [
    known: boolean,
    name: string,
    normalizedX: number,
    normalizedY: number,
    icon: string,
    glowIcon: string | undefined,
    poiType: PointOfInterestType,
    isShownInCurrentMap: boolean,
    linkedCollectibleIsLocked: boolean,
  ]
>
declare function GetFastTravelNodePOIIndicies(
  this: void,
  nodeIndex?: number
): LuaMultiReturn<[zoneIndex: number, poiIndex: number]>
declare function GetFastTravelNodeHouseId(this: void, nodeIndex?: number): number
declare function GetFastTravelNodeMapPriority(this: void, nodeIndex?: number): number | undefined
declare function IsFastTravelNodeAutoDiscovered(this: void, nodeIndex?: number): boolean
declare const FastTravelToNode: (this: void, nodeIndex?: number) => void
declare function GetRecallCost(this: void, nodeIndex?: number): number
declare function GetCurrentBattlegroundId(this: void): number
declare function GetCurrentCampaignId(this: void): number
declare function GetCampaignName(this: void, campaignId?: number): string
declare function GetStoreEntryInfo(
  this: void,
  entryIndex?: number
): LuaMultiReturn<
  [
    icon: string,
    name: string,
    stack: number,
    price: number,
    sellPrice: number,
    meetsRequirementsToBuy: boolean,
    meetsRequirementsToUse: boolean,
    quality: number,
    questNameColor: boolean,
    currencyType1: CurrencyType,
    currencyQuantity1: number,
    currencyType2: CurrencyType,
    currencyQuantity2: number,
    entryType: StoreEntryType,
    buyStoreFailure: StoreFailure,
    buyErrorStringId: number,
    actorCategory: number,
  ]
>
declare function GetNumStoreItems(this: void): number
declare function GetStoreItemLink(this: void, entryIndex?: number, linkStyle?: number): string
declare function GetStoreEntryMaxBuyable(this: void, entryIndex?: number): number
declare function GetBuybackItemLink(this: void, entryIndex?: number, linkStyle?: number): string
declare const BuyStoreItem: (this: void, entryIndex?: number, quantity?: number) => void
declare const SellInventoryItem: (
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  quantity?: number
) => void
declare const SellAllJunk: (this: void) => void
declare const RepairItem: (this: void, bagId?: Bag, slotIndex?: number) => void
declare const LaunderItem: (this: void, bagId?: Bag, slotIndex?: number, quantity?: number) => void
declare function IsStoreEmpty(this: void): boolean
declare function CanStoreRepair(this: void): boolean
declare const LootAll: (this: void, ignoreStolenItems?: boolean) => void
declare function GetLootItemLink(this: void, lootId?: number, linkStyle?: number): string
declare function GetLootItemType(this: void, lootId?: number): LootItemType
declare const LootItemById: (this: void, lootId?: number) => void
declare const EndLooting: (this: void) => void
declare function IsLooting(this: void): boolean
declare function GetLootTargetInfo(
  this: void
): LuaMultiReturn<
  [name: string, targetType: InteractTargetType, actionName: string, isOwned: boolean]
>
declare function GetLootItemInfo(
  this: void,
  lootIndex?: number
): LuaMultiReturn<
  [
    lootId: number,
    name: string,
    icon: string,
    count: number,
    quality: number,
    value: number,
    isQuest: boolean,
    stolen: boolean,
    lootType: LootItemType,
    isLockedSetPiece: boolean,
    canBeUsedToLearn: boolean,
  ]
>
declare function GetLootCurrency(
  this: void,
  type?: CurrencyType
): LuaMultiReturn<[unownedCurrency: number, ownedCurrency: number]>
declare function GetKeepName(this: void, keepId?: number): string
declare function GetNumTitles(this: void): number
declare function GetTitle(this: void, titleIndex?: number): string
declare function GetCurrentTitleIndex(this: void): number | undefined
declare const SelectTitle: (this: void, titleIndex?: number | undefined) => void
declare const Release: (this: void) => void
declare const TradeAddItem: (
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  tradeIndex?: number | undefined
) => void
declare function GetTradeItemInfo(
  this: void,
  who?: TradeParticipant,
  tradeIndex?: number
): LuaMultiReturn<
  [
    name: string,
    icon: string,
    stack: number,
    displayQuality: ItemDisplayQuality,
    creatorName: string,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: EquipType,
    itemStyleId: number,
  ]
>
declare function GetTradeItemBagAndSlot(
  this: void,
  who?: TradeParticipant,
  tradeIndex?: number
): LuaMultiReturn<[bagId: Bag | undefined, slotIndex: number | undefined]>
declare function GetTradeItemLink(
  this: void,
  who?: TradeParticipant,
  tradeIndex?: number,
  linkStyle?: number
): string
declare function GetAvailableSkillPoints(this: void): number
declare function GetNumSkyShards(this: void): number
declare function GetNumSkillTypes(this: void): number
declare function GetNumSkillLines(this: void, skillType?: SkillType): number
declare function GetSkillLineId(this: void, skillType?: SkillType, skillLineIndex?: number): number
declare function GetSkillLineDynamicInfo(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): LuaMultiReturn<
  [
    rank: number,
    isAdvised: boolean,
    isActive: boolean,
    isDiscovered: boolean,
    isAccountSkill: boolean,
    isInTraining: boolean,
    isClassMastery: boolean,
  ]
>
declare function GetSkillLineXPInfo(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): LuaMultiReturn<[lastRankXP: number, nextRankXP: number, currentXP: number]>
declare function GetSkillLineRankXPExtents(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  rank?: number
): LuaMultiReturn<[startXP: number | undefined, nextRankStartXP: number | undefined]>
declare function GetSkillLineOrderingIndex(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): number
declare function GetNumSkillAbilities(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): number
declare function GetSkillAbilityInfo(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): LuaMultiReturn<
  [
    name: string,
    texture: string,
    earnedRank: number,
    passive: boolean,
    ultimate: boolean,
    purchased: boolean,
    progressionIndex: number | undefined,
    rank: number,
  ]
>
declare function GetSkillAbilityId(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number,
  showUpgrade?: boolean
): number
declare function GetProgressionSkillProgressionIndex(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): number | undefined
declare function GetProgressionSkillProgressionId(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): number
declare function GetProgressionSkillMorphSlotAbilityId(
  this: void,
  progressionId?: number,
  morphSlot?: MorphSlot
): number
declare function GetCraftedAbilitySkillCraftedAbilityId(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): number
declare function GetSpecificSkillAbilityInfo(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number,
  morphChoice?: number,
  rank?: number
): LuaMultiReturn<[abilityId: number, skillLineRankNeeded: number, characterLevelNeeded: number]>
declare function GetSpecificSkillAbilityKeysByAbilityId(
  this: void,
  abilityId?: number
): LuaMultiReturn<
  [
    skillType: SkillType,
    skillLineIndex: number,
    skillIndex: number,
    morphChoice: number,
    rank: number,
  ]
>
declare function GetSkillAbilityUpgradeInfo(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): LuaMultiReturn<[currentUpgradeLevel: number | undefined, maxUpgradeLevel: number | undefined]>
declare function IsSkillAbilityPassive(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): boolean
declare function IsCraftedAbilitySkill(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): boolean
declare function IsSkillAbilityUltimate(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): boolean
declare function IsSkillAbilityAutoGrant(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): boolean
declare function GetSkillAbilityLineRankNeededToUnlock(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): number
declare function GetSkillAbilityCharacterLevelNeededToUnlock(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): number
declare function IsSkillAbilityPurchased(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number,
  skillIndex?: number
): boolean
declare function GetSkillAbilityIndicesFromProgressionIndex(
  this: void,
  progressionIndex?: number
): LuaMultiReturn<[skillType: SkillType, skillLineIndex: number, skillIndex: number]>
declare function GetSkillAbilityIndicesFromCraftedAbilityId(
  this: void,
  craftedAbilityId?: number
): LuaMultiReturn<[skillType: SkillType, skillLineIndex: number, skillIndex: number]>
declare function GetSkillLineIndicesFromSkillLineId(
  this: void,
  skillLineId?: number
): LuaMultiReturn<[skillType: SkillType, skillLineIndex: number]>
declare function IsWerewolfSkillLineById(this: void, skillLineId?: number): boolean
declare function GetSkillLineMasteryCollectibleId(this: void, skillLineId?: number): number
declare function GetSubclassingQuestId(this: void): number
declare const BestowSubclassingQuest: (this: void) => void
declare function HasAccessToSubclassing(this: void): boolean
declare const PrepareSkillPointAllocationRequest: (
  this: void,
  allocationMode?: SkillPointAllocationMode,
  respecPaymentType?: RespecPaymentType
) => void
declare const AddHotbarSlotChangeToAllocationRequest: (
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory,
  actionType?: ActionBarSlotType,
  actionId?: number
) => void
declare const SendSkillPointAllocationRequest: (this: void) => void
declare function GetNumSkillLinesForClass(this: void, classId?: number): number
declare function GetSkillLineIdForClass(
  this: void,
  classId?: number,
  classSkillLineIndex?: number
): number
declare function GetSkillLineClassId(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): number
declare const StartSkillRespecFromUI: (this: void) => void
declare function AreCompanionSkillsInitialized(this: void): boolean
declare function GetCompanionSkillLineNameById(this: void, skillLineId?: number): string
