declare function GetUnitBuffInfo(
  this: void,
  unitTag?: string,
  buffIndex?: number
): LuaMultiReturn<
  [
    buffName: string,
    timeStarted: number,
    timeEnding: number,
    buffSlot: number,
    stackCount: number,
    iconFilename: string,
    deprecatedBuffType: string,
    effectType: BuffEffectType,
    abilityType: AbilityType,
    statusEffectType: StatusEffectType,
    abilityId: number,
    canClickOff: boolean,
    castByPlayer: boolean,
  ]
>
declare function GetNumBuffs(this: void, unitTag?: string): number
declare function GetSlotTexture(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): LuaMultiReturn<[texture: string, weapontexture: string, activationAnimation: string]>
declare function GetSlotName(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): string
declare function GetSlotCooldownInfo(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): LuaMultiReturn<
  [remain: number, duration: number, global: boolean, globalSlotType: ActionBarSlotType]
>
declare function GetSlotItemSound(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory
): number
declare function IsValidItemForSlot(
  this: void,
  bagId?: Bag,
  bagSlotIndex?: number,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory
): boolean
declare const CompleteQuest: (this: void) => void
declare const AbandonQuest: (this: void, journalQuestIndex?: number) => void
declare const ShareQuest: (this: void, journalQuestIndex?: number) => void
declare function GetJournalQuestStepInfo(
  this: void,
  journalQuestIndex?: number,
  stepIndex?: number
): LuaMultiReturn<
  [
    journalText: string,
    visibility: QuestStepVisibility | undefined,
    comparisonType: QuestStepComparisonType,
    trackerOverrideText: string,
    numConditions: number,
  ]
>
declare function GetJournalQuestLocationInfo(
  this: void,
  journalQuestIndex?: number
): LuaMultiReturn<[zoneName: string, objectiveName: string, zoneIndex: number, poiIndex: number]>
declare function GetJournalQuestNumConditions(
  this: void,
  journalQuestIndex?: number,
  stepIndex?: number
): number
declare function GetJournalQuestNumSteps(this: void, journalQuestIndex?: number): number
declare function GetQuestToolCount(this: void, journalQuestIndex?: number): number
declare const EndInteraction: (this: void, interactionType?: number) => void
declare function GetItemInstanceId(this: void, bagId?: Bag, slotIndex?: number): number | undefined
declare function GetItemTotalCount(this: void, bagId?: Bag, slotIndex?: number): number
declare function GetQuestItemNameFromLink(this: void, link?: string): string
declare function GetItemName(this: void, bagId?: Bag, slotIndex?: number): string
declare function IsItemUsable(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[usable: boolean, usableOnlyFromActionSlot: boolean]>
declare function GetSlotStackSize(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[stack: number, maxStack: number]>
declare function GetEquippedItemInfo(
  this: void,
  equipSlot?: EquipSlot
): LuaMultiReturn<
  [
    icon: string,
    slotHasItem: boolean,
    sellPrice: number,
    isHeldSlot: boolean,
    isHeldNow: boolean,
    locked: boolean,
  ]
>
declare function IsEquipable(
  this: void,
  bagId?: Bag,
  slotIndex?: number
): LuaMultiReturn<[isEquipable: boolean, resultErrorCodeIfFailed: number]>
declare function GetItemLinkInfo(
  this: void,
  itemLink?: string
): LuaMultiReturn<
  [
    icon: string,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: EquipType,
    itemStyleId: number,
  ]
>
declare function GetSelectedGuildBankId(this: void): number | undefined
declare function GetMapPlayerPosition(
  this: void,
  unitTag?: string
): LuaMultiReturn<
  [
    normalizedX: number,
    normalizedZ: number,
    heading: number,
    isShownInCurrentMap: boolean,
    isSymbolicLocation: boolean,
  ]
>
declare function GetMapPing(
  this: void,
  unitTag?: string
): LuaMultiReturn<[normalizedX: number, normalizedY: number]>
declare function GetMapRallyPoint(
  this: void
): LuaMultiReturn<[normalizedX: number, normalizedY: number]>
declare function GetMapPlayerWaypoint(
  this: void
): LuaMultiReturn<[normalizedX: number, normalizedY: number]>
declare function GetKeepFastTravelInteraction(this: void): number | undefined
declare function GetNumLootItems(this: void): number
declare function GetTrackedIsAssisted(
  this: void,
  trackType?: TrackedDataType,
  param1?: number,
  param2?: number
): boolean
declare function FormatAchievementLinkTimestamp(
  this: void,
  timestamp?: string | number
): LuaMultiReturn<[date: string, time: string]>
declare function GetAbilityProgressionInfo(
  this: void,
  progressionIndex?: number
): LuaMultiReturn<[name: string, morph: number, rank: number]>
declare function GetAbilityProgressionXPInfo(
  this: void,
  progressionIndex?: number
): LuaMultiReturn<[lastRankXp: number, nextRankXP: number, currentXP: number, atMorph: boolean]>
declare function GetAbilityProgressionAbilityInfo(
  this: void,
  progressionIndex?: number,
  morph?: number,
  rank?: number
): LuaMultiReturn<[name: string, texture: string, abilityIndex: number]>
declare function GetAbilityProgressionRankFromAbilityId(
  this: void,
  abilityId?: number
): number | undefined
declare function GetAbilityProgressionXPInfoFromAbilityId(
  this: void,
  abilityId?: number
): LuaMultiReturn<
  [
    hasProgression: boolean,
    progressionIndex: number,
    lastRankXp: number,
    nextRankXP: number,
    currentXP: number,
    atMorph: boolean,
  ]
>
declare function GetGameCameraInteractableActionInfo(
  this: void
): LuaMultiReturn<
  [
    action: string | undefined,
    name: string | undefined,
    interactBlocked: boolean,
    isOwned: boolean,
    additionalInfo: number,
    contextualInfo: number | undefined,
    contextualLink: string | undefined,
    isCriminalInteract: boolean,
  ]
>
declare function GetAllyUnitBlockState(this: void, unitTag?: string): BlockState
declare const Quit: (this: void) => void
declare const CancelLogout: (this: void) => void
declare function GetIsNewCharacter(this: void): boolean
declare function GetWorldName(this: void): string
declare function GetPlayerStatus(this: void): PlayerStatus
declare const SelectPlayerStatus: (this: void, status?: PlayerStatus) => void
declare function GetCursorBagId(this: void): Bag | undefined
declare function GetCursorSlotIndex(this: void): number | undefined
declare function GetNumActionLayers(this: void): number
declare function GetActionLayerInfo(
  this: void,
  layerIndex?: number
): LuaMultiReturn<[layerName: string, numLayerCategories: number]>
declare function GetActionLayerCategoryInfo(
  this: void,
  layerIndex?: number,
  categoryIndex?: number
): LuaMultiReturn<[categoryName: string, numActions: number]>
declare function GetActionInfo(
  this: void,
  layerIndex?: number,
  categoryIndex?: number,
  actionIndex?: number
): LuaMultiReturn<[actionName: string, isRebindable: boolean, isHidden: boolean]>
declare function GetActionBindingInfo(
  this: void,
  layerIndex?: number,
  categoryIndex?: number,
  actionIndex?: number,
  bindingIndex?: number
): LuaMultiReturn<[keyCode: KeyCode, mod1: KeyCode, mod2: KeyCode, mod3: KeyCode, mod4: KeyCode]>
declare function GetHighestPriorityActionBindingInfoFromName(
  this: void,
  actionName?: string,
  preferGamepad?: boolean
): LuaMultiReturn<[keyCode: KeyCode, mod1: KeyCode, mod2: KeyCode, mod3: KeyCode, mod4: KeyCode]>
declare function GetMaxBindingsPerAction(this: void): number
declare function GetActionIndicesFromName(
  this: void,
  actionName?: string
): LuaMultiReturn<
  [
    layerIndex: number | undefined,
    categoryIndex: number | undefined,
    actionIndex: number | undefined,
  ]
>
declare const PushActionLayerByName: (this: void, layerName?: string) => void
declare const RemoveActionLayerByName: (this: void, layerName?: string) => void
declare function GetNumCharacters(this: void): number
declare function GetCharacterInfo(
  this: void,
  index?: number
): LuaMultiReturn<
  [
    name: string,
    gender: Gender,
    level: number,
    classId: number,
    raceId: number,
    alliance: Alliance,
    id: string,
    locationId: number,
  ]
>
declare function GetAdvancedStatValue(
  this: void,
  statType?: AdvancedStatDisplayType
): LuaMultiReturn<
  [
    displayFormat: AdvancedStatDisplayFormat,
    flatValue: number | undefined,
    percentValue: number | undefined,
  ]
>
declare function GetCon(
  this: void,
  otherLevel?: number,
  playerLevel?: number | undefined
): DifficultyCon
declare const CastGroupVote: (this: void, vote?: GroupVoteChoice) => void
declare const GroupLeave: (this: void) => void
declare const GroupInviteByName: (this: void, characterOrDisplayName?: string) => void
declare const GroupDisband: (this: void) => void
declare function IsPlayerInGroup(this: void, characterOrDisplayName?: string): boolean
declare function GetGroupSize(this: void): number
declare const JumpToGroupLeader: (this: void) => void
declare const JumpToGroupMember: (this: void, characterOrDisplayName?: string) => void
declare function GetGroupUnitTagByIndex(this: void, sortIndex?: number): string | undefined
declare function GetGroupIndexByUnitTag(this: void, unitTag?: string): number
declare function IsAnyGroupMemberInDungeon(this: void): boolean
declare function GetGroupMemberSelectedRole(this: void, unitTag?: string): LFGRole
declare function IsGroupModificationAvailable(this: void): boolean
declare function GetGroupElectionInfo(
  this: void
): LuaMultiReturn<
  [
    electionType: GroupElectionType,
    timeRemainingSeconds: number,
    electionDescriptor: string,
    targetUnitTag: string | undefined,
  ]
>
declare function IsRaidInProgress(this: void): boolean
declare function IsPlayerInRaid(this: void): boolean
declare function GetRaidName(this: void, raidId?: number): string
declare function GetCurrentParticipatingRaidId(this: void): number
declare function GetNumStacksForEndlessDungeonBuff(
  this: void,
  buffAbilityId?: number,
  includeLifetimeStacks?: boolean
): number
declare const JumpToFriend: (this: void, displayName?: string) => void
declare const JumpToHouse: (this: void, displayName?: string) => void
declare const JumpToSpecificHouse: (
  this: void,
  displayName?: string,
  houseId?: number,
  fromHouseTours?: boolean
) => void
declare function GetNextLeaderboardScoreNotificationId(
  this: void,
  lastId?: number | undefined
): number | undefined
declare function GetLeaderboardScoreNotificationInfo(
  this: void,
  notificationId?: number
): LuaMultiReturn<
  [
    contentType: LeaderboardScoreNotificationType,
    contentId: number,
    contentContextualInfo: number,
    score: number,
    millisecondsSinceRequest: number,
    numMembers: number,
  ]
>
declare function GetLeaderboardScoreNotificationMemberInfo(
  this: void,
  notificationId?: number,
  memberIndex?: number
): LuaMultiReturn<
  [
    displayName: string,
    characterName: string,
    isFriend: boolean,
    isGuildMember: boolean,
    isPlayer: boolean,
  ]
>
declare const RemoveLeaderboardScoreNotification: (this: void, notificationId?: number) => void
declare function IsCommunicationRestricted(this: void): boolean
declare function CanCommunicateWith(
  this: void,
  characterOrDisplayName?: string,
  consoleId?: Id64
): boolean
declare function GetSlotItemLink(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory
): string
declare function GetSlotBoundId(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): number
declare function GetSlotType(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): ActionBarSlotType
declare function GetCurrentQuickslot(this: void): number
declare const SetCurrentQuickslot: (this: void, actionSlotIndex?: number) => void
declare function GetActiveHotbarCategory(this: void): HotBarCategory
declare function GetActionSlotEffectTimeRemaining(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): number
declare function GetActionSlotEffectStackCount(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): number
declare function IsSlotToggled(
  this: void,
  actionSlotIndex?: number,
  hotbarCategory?: HotBarCategory | undefined
): boolean
declare function GetRidingStats(
  this: void
): LuaMultiReturn<
  [
    inventoryBonus: number,
    maxInventoryBonus: number,
    staminaBonus: number,
    maxStaminaBonus: number,
    speedBonus: number,
    maxSpeedBonus: number,
  ]
>
declare function GetTimeUntilCanBeTrained(
  this: void
): LuaMultiReturn<[timeMs: number, totalDurationMs: number]>
declare function IsMounted(this: void): boolean
declare function GetAbilityEffectDescription(this: void, effectSlotId?: number): string
declare function GetOfferedQuestInfo(
  this: void
): LuaMultiReturn<[dialogue: string, response: string]>
declare const AcceptOfferedQuest: (this: void) => void
declare const AcceptSharedQuest: (this: void, questId?: number) => void
declare function GetNumJournalQuests(this: void): number
declare function IsValidQuestIndex(this: void, journalQuestIndex?: number): boolean
declare function GetJournalQuestType(this: void, journalQuestIndex?: number): QuestType
declare function GetJournalQuestRepeatType(
  this: void,
  journalQuestIndex?: number
): QuestRepeatableType
