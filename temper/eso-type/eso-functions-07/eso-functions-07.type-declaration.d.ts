declare const EquipOutfit: (
  this: void,
  actorCategory?: GameplayActorCategory,
  outfitIndex?: number
) => void
declare const UnequipOutfit: (this: void, actorCategory?: GameplayActorCategory) => void
declare function GetEquippedOutfitIndex(
  this: void,
  actorCategory?: GameplayActorCategory
): number | undefined
declare function GetFenceSellTransactionInfo(
  this: void
): LuaMultiReturn<[totalSells: number, sellsUsed: number, resetTimeSeconds: number]>
declare function GetFenceLaunderTransactionInfo(
  this: void
): LuaMultiReturn<[totalLaunders: number, laundersUsed: number, resetTimeSeconds: number]>
declare function CanChampionSkillTypeBeSlotted(
  this: void,
  championSkillType?: ChampionSkillType
): boolean
declare function GetChampionDisciplineName(this: void, disciplineId?: number): string
declare function GetChampionDisciplineType(
  this: void,
  disciplineId?: number
): ChampionDisciplineType
declare function GetNumChampionDisciplineSkills(this: void, disciplineIndex?: number): number
declare function GetChampionSkillName(this: void, championSkillId?: number): string
declare function GetNumPointsSpentOnChampionSkill(this: void, championSkillId?: number): number
declare function GetNumSpentChampionPoints(this: void, disciplineId?: number): number
declare function GetNumUnspentChampionPoints(this: void, disciplineId?: number): number
declare function GetChampionSkillDescription(
  this: void,
  championSkillId?: number,
  numPendingPoints?: number
): string
declare function GetChampionSkillCurrentBonusText(
  this: void,
  championSkillId?: number,
  numPendingPoints?: number
): string
declare function GetChampionAbilityId(this: void, championSkillId?: number): number
declare function GetChampionRespecCost(this: void): number
declare function GetChampionSkillLinkIds(
  this: void,
  championSkillId?: number
): LuaMultiReturn<[linkedSkillId: number, ...rest: number[]]>
declare function GetChampionSkillId(
  this: void,
  disciplineIndex?: number,
  championSkillIndex?: number
): number
declare function IsChampionSkillRootNode(this: void, championSkillId?: number): boolean
declare function DoesChampionSkillHaveJumpPoints(this: void, championSkillId?: number): boolean
declare function GetChampionSkillJumpPoints(
  this: void,
  championSkillId?: number
): LuaMultiReturn<[jumpPoint: number, ...rest: number[]]>
declare function GetChampionSkillMaxPoints(this: void, championSkillId?: number): number
declare function WouldChampionSkillNodeBeUnlocked(
  this: void,
  championSkillId?: number,
  pendingPoints?: number
): boolean
declare function GetChampionSkillType(this: void, championSkillId?: number): ChampionSkillType
declare function IsChampionSkillClusterRoot(this: void, championSkillId?: number): boolean
declare function GetChampionClusterName(this: void, rootChampionSkillId?: number): string
declare function GetChampionClusterSkillIds(
  this: void,
  rootChampionSkillId?: number
): LuaMultiReturn<[championSkillIds: number, ...rest: number[]]>
declare const PrepareChampionPurchaseRequest: (this: void, respecNeeded?: boolean) => void
declare const AddSkillToChampionPurchaseRequest: (
  this: void,
  championSkillId?: number,
  newPendingPoints?: number
) => void
declare const AddHotbarSlotToChampionPurchaseRequest: (
  this: void,
  slotIndex?: number,
  championSkillId?: number
) => void
declare function GetExpectedResultForChampionPurchaseRequest(this: void): ChampionPurchaseResult
declare const SendChampionPurchaseRequest: (this: void) => void
declare function GetChampionDisciplineId(this: void, disciplineIndex?: number): number
declare function GetDefaultQuickChatName(this: void, index?: number): string
declare function GetDefaultQuickChatMessage(this: void, index?: number): string
declare function ZoUTF8StringLength(this: void, string?: string): number
declare function GetCurrentZoneDungeonDifficulty(this: void): DungeonDifficulty
declare function GetCurrentZoneHouseId(this: void): number
declare function GetNumFurnitureCategories(this: void): number
declare function GetFurnitureCategoryId(this: void, categoryIndex?: number): number
declare function GetNumFurnitureSubcategories(this: void, categoryIndex?: number): number
declare function GetFurnitureSubcategoryId(
  this: void,
  categoryIndex?: number,
  subcategoryIndex?: number
): number
declare function IsPrimaryHouse(this: void, houseId?: number): boolean
declare function HousingEditorGetFurnitureWorldPosition(
  this: void,
  furnitureId?: Id64
): LuaMultiReturn<[worldX: number, worldY: number, worldZ: number]>
declare function GetHousingEditorMode(this: void): HousingEditorMode
declare function GetNextPlacedHousingFurnitureId(
  this: void,
  lastFurnitureId?: Id64 | undefined
): Id64 | undefined
declare function GetPlacedHousingFurnitureInfo(
  this: void,
  furnitureId?: Id64
): LuaMultiReturn<[itemName: string, icon: string, furnitureDataId: number]>
declare function GetPlacedHousingFurnitureDisplayQuality(
  this: void,
  furnitureId?: Id64
): ItemDisplayQuality
declare function GetCurrentHouseOwner(this: void): string
declare function IsOwnerOfCurrentHouse(this: void): boolean
declare function GetPlacedFurnitureLink(
  this: void,
  placedFurnitureId?: Id64,
  linkStyle?: number
): LuaMultiReturn<[itemLink: string, collectibleLink: string]>
declare function GetCollectibleIdFromFurnitureId(this: void, furnitureId?: Id64): number
declare const RequestOpenUnsafeURL: (this: void, URL?: string) => void
declare function GetRearchLineInfoFromRetraitItem(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[craftingType: TradeskillType, researchLineName: string]>
declare function GetItemTraitTypeCategory(
  this: void,
  itemTraitType?: ItemTraitType
): ItemTraitTypeCategory
declare function GetNextZoneStoryZoneId(
  this: void,
  lastZoneId?: number | undefined
): number | undefined
declare function GetNumZoneActivitiesForZoneCompletionType(
  this: void,
  zoneId?: number,
  zoneCompletionType?: ZoneCompletionType
): number
declare function GetZoneActivityIdForZoneCompletionType(
  this: void,
  zoneId?: number,
  zoneCompletionType?: ZoneCompletionType,
  activitiyIndex?: number
): number
declare function IsZoneStoryActivityComplete(
  this: void,
  zoneId?: number,
  zoneCompletionType?: ZoneCompletionType,
  activityIndex?: number
): boolean
declare function GetZoneStoryActivityNameByActivityIndex(
  this: void,
  zoneId?: number,
  zoneCompletionType?: ZoneCompletionType,
  activityIndex?: number
): string
declare function GetPOIWorldEventInstanceId(
  this: void,
  zoneIndex?: number,
  poiIndex?: number
): number
declare function ClearGuildHistoryCache(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory | undefined,
  keepResultsFromLastNumSeconds?: number
): boolean
declare function GetNumGuildHistoryEvents(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory
): number
declare function GetGuildHistoryEventIndicesForTimeRange(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  newestTimeS?: number,
  oldestTimeS?: number
): LuaMultiReturn<[newestEventIndex: number | undefined, oldestEventIndex: number | undefined]>
declare function GetOldestGuildHistoryEventIndexForUpToDateEventsWithoutGaps(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory
): number | undefined
declare function GetNumGuildHistoryEventRanges(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory
): number
declare function GetGuildHistoryEventRangeInfo(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  rangeIndex?: number
): LuaMultiReturn<
  [newestTimeS: number, oldestTimeS: number, newestEventId: number, oldestEventId: number]
>
declare function GetGuildHistoryEventRangeIndexForEventId(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventId?: number
): number | undefined
declare function GetGuildHistoryEventIndex(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventId?: number
): number | undefined
declare function GetGuildHistoryEventId(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventIndex?: number
): number
declare function GetGuildHistoryEventTimestamp(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventIndex?: number
): number
declare function IsGuildHistoryEventRedacted(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventIndex?: number
): boolean
declare function GetGuildHistoryEventBasicInfo(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  eventIndex?: number
): LuaMultiReturn<[eventId: number, timestamp: number, isRedacted: boolean, eventType: number]>
declare function GetGuildHistoryTraderEventInfo(
  this: void,
  guildId?: number,
  eventIndex?: number
): LuaMultiReturn<
  [
    eventId: number,
    timestampS: number,
    isRedacted: boolean,
    eventType: GuildHistoryTraderEvent,
    sellerDisplayName: string,
    buyerDisplayName: string,
    itemLink: string,
    quantity: number,
    price: number,
    tax: number,
  ]
>
declare function CreateGuildHistoryRequest(
  this: void,
  guildId?: number,
  category?: GuildHistoryEventCategory,
  newestTimeS?: number,
  oldestTimeS?: number
): number
declare function IsGuildHistoryRequestComplete(this: void, requestId?: number): boolean
declare function DoesGuildHistoryHaveOutstandingRequest(this: void): boolean
declare function RequestMoreGuildHistoryEvents(
  this: void,
  requestId?: number,
  queueRequestIfOnCooldown?: boolean,
  targetNewestEventId?: number | undefined,
  targetOldestEventId?: number | undefined
): GuildHistoryDataReadyState
declare function DestroyGuildHistoryRequest(this: void, requestId?: number): boolean
declare const DumpGuildHistoryChunkInformation: (this: void, guildId?: number | undefined) => void
declare function SetMapToDigSitePosition(this: void, digSiteId?: number): SetMapResultCode
declare function GetAntiquityLeadTimeRemainingSeconds(this: void, antiquityId?: number): number
declare function IsAntiquityRepeatable(this: void, antiquityId?: number): boolean
declare function GetAntiquityCategoryId(this: void, antiquityId?: number): number
declare function GetAntiquityDifficulty(this: void, antiquityId?: number): AntiquityDifficulty
declare function GetNextAntiquityId(
  this: void,
  lastAntiquityId?: number | undefined
): number | undefined
declare function GetAntiquityZoneId(this: void, antiquityId?: number): number
declare function GetAntiquityCategoryName(this: void, antiquityCategoryId?: number): string
declare function GetAntiquitySetRewardId(this: void, antiquitySetId?: number): number
declare const RequestItemReconstruction: (
  this: void,
  itemDefId?: number,
  itemTrait?: ItemTraitType,
  itemQuality?: ItemQuality,
  currencyType?: CurrencyType
) => void
declare function GetNextItemSetCollectionId(
  this: void,
  lastItemSetId?: number | undefined
): number | undefined
declare function GetItemSetCollectionCategoryId(this: void, itemSetId?: number): number
declare function GetItemSetName(this: void, itemSetId?: number): string
declare function GetItemSetType(this: void, itemSetId?: number): ItemSetType
declare function GetItemSetUnperfectedSetId(this: void, itemSetId?: number): number
declare function GetNumItemSetCollectionPieces(this: void, itemSetId?: number): number
declare function GetItemSetCollectionPieceInfo(
  this: void,
  itemSetId?: number,
  index?: number
): LuaMultiReturn<[pieceId: number, slot: Id64]>
declare function GetNumItemSetCollectionSlotsUnlocked(this: void, itemSetId?: number): number
declare function IsItemSetCollectionSlotUnlocked(
  this: void,
  itemSetId?: number,
  slot?: Id64
): boolean
declare function GetNumItemReconstructionCurrencyOptions(this: void): number
declare function GetItemReconstructionCurrencyOptionType(
  this: void,
  currencyOptionIndex?: number
): CurrencyType
declare function GetItemReconstructionCurrencyOptionCost(
  this: void,
  itemSetId?: number,
  currencyType?: CurrencyType
): number | undefined
declare function GetItemSetCollectionCategoryName(this: void, categoryId?: number): string
declare function GetItemSetCollectionCategoryParentId(this: void, categoryId?: number): number
declare function GetItemSetCollectionPieceItemLink(
  this: void,
  pieceId?: number,
  linkStyle?: number,
  traitType?: ItemTraitType,
  upgradeItemFunctionalQuality?: ItemQuality | undefined
): string
declare function GetEquipmentFilterTypeForItemSetCollectionSlot(
  this: void,
  slot?: Id64
): EquipmentFilterType
declare function GetCollectibleCategoryNameByCategoryId(this: void, categoryId?: number): string
declare function HasActiveCompanion(this: void): boolean
declare function HasPendingCompanion(this: void): boolean
declare function GetActiveCompanionDefId(this: void): number
declare function GetPendingCompanionDefId(this: void): number
declare function GetCompanionCollectibleId(this: void, companionId?: number): number
declare function GetCompanionName(this: void, companionId?: number): string
declare function GetActiveCompanionLevelInfo(
  this: void
): LuaMultiReturn<[level: number, currentExperience: number]>
declare function GetMaximumRapport(this: void): number
declare function GetActiveCompanionRapportLevel(this: void): CompanionRapportLevel
declare function GetActiveCompanionRapport(this: void): number
declare function GetActiveCompanionRapportLevelDescription(
  this: void,
  rapportLevel?: CompanionRapportLevel
): string
declare function GetNumSkyshardsInZone(this: void, zoneId?: number): number
declare function GetZoneSkyshardId(this: void, zoneId?: number, skyshardIndex?: number): number
