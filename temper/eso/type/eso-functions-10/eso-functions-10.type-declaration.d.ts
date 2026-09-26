declare function GetQuestZoneId(this: void, questId?: number): number
declare function GetQuestName(this: void, questId?: number): string
declare function GetDyeInfoById(
  this: void,
  dyeId?: number
): LuaMultiReturn<
  [
    dyeName: string,
    known: boolean,
    rarity: DyeRarity,
    hueCategory: DyeHueCategory,
    achievementId: number,
    r: number,
    g: number,
    b: number,
    sortKey: number,
  ]
>
declare function GetNumUnlockedOutfits(this: void, actorCategory?: GameplayActorCategory): number
declare function IsCharacterPreviewingAvailable(this: void): boolean
declare const RequestJumpToHouse: (this: void, houseId?: number, jumpOutside?: boolean) => void
declare function ClearCursor(this: void): boolean
declare function GetCursorContentType(this: void): number
declare function GetCraftingSkillName(this: void, craftingSkillType?: TradeskillType): string
declare function GetFurnitureCategoryName(this: void, furnitureCategoryId?: number): string
declare function GetFurnitureDataCategoryInfo(
  this: void,
  furnitureDataId?: number
): LuaMultiReturn<[categoryId: number | undefined, subcategoryId: number | undefined]>
declare function GetCollectibleIdForHouse(this: void, houseId?: number): number
declare function IsInteractionUsingInteractCamera(this: void): boolean
declare function GetInteractionType(this: void): InteractionType
declare function GetUniversalStyleId(this: void): number
declare function GetItemStyleName(this: void, styleId?: number): string
declare function GetJewelrycraftingCollectibleId(this: void): number
declare function GetNumEmotes(this: void): number
declare function GetEmoteIndex(this: void, emoteId?: number): number | undefined
declare function GetEmoteInfo(
  this: void,
  emoteIndex?: number
): LuaMultiReturn<
  [
    slashName: string,
    category: EmoteCategory,
    emoteId: number,
    displayName: string,
    showInGamepadUI: boolean,
  ]
>
declare function GetEmoteCollectibleId(this: void, emoteIndex?: number): number | undefined
declare const PlayEmoteByIndex: (this: void, emoteIndex?: number) => void
declare function GetEmoteCategoryKeyboardIcons(
  this: void,
  category?: EmoteCategory
): LuaMultiReturn<
  [unpressedButtonIcon: string, pressedButtonIcon: string, mouseoverButtonIcon: string]
>
declare function GetItemRewardItemLink(
  this: void,
  rewardId?: number,
  quantity?: number,
  displayFlags?: RewardDisplayFlags,
  linkStyle?: number
): string
declare function GetItemRewardItemId(this: void, rewardId?: number): number
declare function GetTimeUntilNextDailyLoginRewardClaimS(this: void): number
declare function GetZoneId(this: void, zoneIndex?: number): number
declare function GetParentZoneId(this: void, zoneId?: number): number
declare function GetZoneIndex(this: void, zoneId?: number): number
declare function GetZoneNameById(this: void, zoneId?: number): string
declare function GetAchievementName(this: void, achievementId?: number): string
declare function GetAchievementInfo(
  this: void,
  achievementId?: number
): LuaMultiReturn<
  [
    name: string,
    description: string,
    points: number,
    icon: string,
    completed: boolean,
    date: string,
    time: string,
  ]
>
declare function GetAchievementNumCriteria(this: void, achievementId?: number): number
declare function GetAchievementCriterion(
  this: void,
  achievementId?: number,
  criterionIndex?: number
): LuaMultiReturn<[description: string, numCompleted: number, numRequired: number]>
declare function GetAchievementRewardTitle(
  this: void,
  achievementId?: number
): LuaMultiReturn<[hasRewardOfType: boolean, titleName: string]>
declare function GetAchievementPersistenceLevel(
  this: void,
  achievementId?: number
): AchievementPersistenceLevel
declare function IsAchievementComplete(this: void, achievementId?: number): boolean
declare function DoesAntiquityNeedCombination(this: void, antiquityId?: number): boolean
declare function GetNumAntiquityLoreEntries(this: void, antiquityId?: number): number
declare function GetAntiquityName(this: void, antiquityId?: number): string
declare function GetAntiquityQuality(this: void, antiquityId?: number): AntiquityQuality
declare function GetAntiquityRewardId(this: void, antiquityId?: number): number
declare function GetAntiquitySetId(this: void, antiquityId?: number): number
declare function GetNumAntiquitiesRecovered(this: void, antiquityId?: number): number
declare function GetNumAntiquityLoreEntriesAcquired(this: void, antiquityId?: number): number
declare function DoesAntiquityHaveLead(this: void, antiquityId?: number): boolean
declare function GetAntiquitySetName(this: void, antiquitySetId?: number): string
declare function GetAntiquitySetQuality(this: void, antiquitySetId?: number): AntiquityQuality
declare function GetNumAntiquitySetAntiquities(this: void, antiquitySetId?: number): number
declare function GetAntiquitySetAntiquityId(
  this: void,
  antiquitySetId?: number,
  antiquityIndex?: number
): number
declare function GetAbilityName(this: void, abilityId?: number, casterUnitTag?: string): string
declare function GetAbilityCastInfo(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): LuaMultiReturn<[channeled: boolean | undefined, durationValue: number | undefined]>
declare function GetAbilityTargetDescription(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): string | undefined
declare function GetAbilityRange(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): LuaMultiReturn<[minRangeCM: number | undefined, maxRangeCM: number | undefined]>
declare function GetAbilityRadius(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): number | undefined
declare function GetAbilityAngleDistance(this: void, abilityId?: number): number | undefined
declare function IsAbilityDurationToggled(
  this: void,
  abilityId?: number,
  casterUnitTag?: string
): boolean | undefined
declare function GetAbilityDuration(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): number | undefined
declare function GetAbilityCooldown(
  this: void,
  abilityId?: number,
  casterUnitTag?: string
): number | undefined
declare function GetAbilityIcon(this: void, abilityId?: number): string
declare function GetNextAbilityMechanicFlag(
  this: void,
  abilityId?: number,
  lastMechanicFlag?: CombatMechanicFlags | undefined
): CombatMechanicFlags | undefined
declare function GetAbilityBaseCostInfo(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): LuaMultiReturn<
  [
    baseCost: number | undefined,
    mechanicFlags: CombatMechanicFlags | undefined,
    isCostChargedPerTick: boolean | undefined,
  ]
>
declare function GetAbilityCost(
  this: void,
  abilityId?: number,
  mechanicFlag?: CombatMechanicFlags,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): number
declare function GetAbilityCostPerTick(
  this: void,
  abilityId?: number,
  mechanic?: CombatMechanicFlags,
  overrideRank?: number | undefined
): number
declare function GetAbilityFrequencyMS(
  this: void,
  abilityId?: number,
  casterUnitTag?: string
): number | undefined
declare function GetAbilityRoles(
  this: void,
  abilityId?: number
): LuaMultiReturn<
  [isTankRoleAbility: boolean, isHealerRoleAbility: boolean, isDamageRoleAbility: boolean]
>
declare function GetAbilityDescription(
  this: void,
  abilityId?: number,
  overrideRank?: number | undefined,
  casterUnitTag?: string
): string
declare function IsAbilityPassive(this: void, abilityId?: number): boolean
declare function IsAbilityUltimate(this: void, abilityId?: number): boolean
declare function GetAbilityCraftedAbilityId(this: void, abilityId?: number): number
declare function IsItemSetCollectionPieceUnlocked(this: void, pieceId?: number): boolean
declare function GetSkillLineNameById(this: void, skillLineId?: number): string
declare function GetNumTributePatrons(this: void): number
declare function GetTributePatronIdAtIndex(this: void, index?: number): number
declare function GetTributePatronCollectibleId(this: void, patronId?: number): number
declare function GetTributeCardName(this: void, cardDefId?: number): string
declare function GetTributePatronName(this: void, patronId?: number): string
declare function GetTributePatronCategoryId(this: void, patronId?: number): number
declare function GetTributePatronCategoryName(this: void, categoryId?: number): string
declare function GetTributePatronNumDockCards(this: void, patronId?: number): number
declare function GetTributePatronDockCardInfoByIndex(
  this: void,
  patronId?: number,
  cardIndex?: number
): LuaMultiReturn<[baseCardId: number, upgradeCardId: number, quantity: number]>
declare function GetMailAttachmentInfo(
  this: void,
  mailId?: Id64
): LuaMultiReturn<[numAttachments: number, attachedMoney: number, codAmount: number]>
declare function IsPromotionalEventSystemLocked(this: void): boolean
declare function GetNumActivePromotionalEventCampaigns(this: void): number
declare function GetActivePromotionalEventCampaignKey(this: void, campaignIndex?: number): Id64
declare function GetPromotionalEventCampaignInfo(
  this: void,
  campaignKey?: Id64
): LuaMultiReturn<
  [
    campaignId: number,
    numActivities: number,
    numMilestones: number,
    capstoneCompletionThreshold: number,
    capstoneRewardId: number,
    capstoneRewardQuantity: number,
  ]
>
declare function IsCurrentCampaignVengeanceRuleset(this: void): boolean
declare function GetActiveReferenceTrackIdsForRewardTrackType(
  this: void,
  rewardTrackType?: RewardTrackType
): LuaMultiReturn<[referenceTrackId: number, ...rest: number[]]>
