declare function GetNumCompanionSkillLines(this: void, skillType?: SkillType): number
declare function GetCompanionSkillLineId(
  this: void,
  skillType?: SkillType,
  skillLineIndex?: number
): number
declare function GetCompanionSkillLineDynamicInfo(
  this: void,
  skillLineId?: number
): LuaMultiReturn<[rank: number, active: boolean, discovered: boolean]>
declare function GetCompanionSkillLineXPInfo(
  this: void,
  skillLineId?: number
): LuaMultiReturn<[lastRankXP: number, nextRankXP: number, currentXP: number]>
declare function GetNumAbilitiesInCompanionSkillLine(this: void, skillLineId?: number): number
declare function GetCompanionAbilityId(
  this: void,
  skillLineId?: number,
  abilityIndex?: number
): number
declare function GetCompanionAbilityRankRequired(this: void, abilityId?: number): number
declare function GetNumMailItemsByCategory(this: void, category?: MailCategory): number
declare function GetMailIdByIndex(this: void, category?: MailCategory, index?: number): Id64
declare function GetNextMailId(this: void, lastMailId?: Id64 | undefined): Id64 | undefined
declare function GetMailItemInfo(
  this: void,
  mailId?: Id64
): LuaMultiReturn<
  [
    senderDisplayName: string,
    senderCharacterName: string,
    subject: string,
    icon: string,
    unread: boolean,
    fromSystem: boolean,
    fromCustomerService: boolean,
    returned: boolean,
    numAttachments: number,
    attachedMoney: number,
    codAmount: number,
    expiresInDays: number | undefined,
    secsSinceReceived: number,
    category: MailCategory,
  ]
>
declare const SendMail: (this: void, to?: string, subject?: string, body?: string) => void
declare const ClearQueuedMail: (this: void) => void
declare const CloseMailbox: (this: void) => void
declare function RequestReadMail(this: void, mailId?: Id64): RequestReadMailResult
declare const DeleteMail: (this: void, mailId?: Id64) => void
declare const ReturnMail: (this: void, mailId?: Id64) => void
declare function ReadMail(this: void, mailId?: Id64): string
declare function CanQueueItemAttachment(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  attachmentSlot?: number
): boolean
declare const QueueMoneyAttachment: (this: void, amount?: number) => void
declare function GetMailQueuedAttachmentLink(
  this: void,
  attachmentSlot?: number,
  linkStyle?: number
): string
declare function GetQueuedItemAttachmentInfo(
  this: void,
  attachmentSlot?: number
): LuaMultiReturn<[bagId: Bag, slotIndex: number, icon: string, stack: number]>
declare function GetAttachedItemLink(
  this: void,
  mailId?: Id64,
  attachIndex?: number,
  linkStyle?: number
): string
declare function GetAttachedItemInfo(
  this: void,
  mailId?: Id64,
  attachIndex?: number
): LuaMultiReturn<
  [
    icon: string,
    stack: number,
    creatorName: string,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: number,
    itemStyleId: number,
    displayQuality: ItemDisplayQuality,
  ]
>
declare const TakeMailAttachments: (this: void, mailId?: Id64, deleteOnClaim?: boolean) => void
declare const TakeAllMailAttachmentsInCategory: (
  this: void,
  category?: MailCategory,
  deleteOnClaim?: boolean
) => void
declare function CanTryTakeAllMailAttachmentsInCategory(
  this: void,
  category?: MailCategory,
  deleteOnClaim?: boolean
): boolean
declare const RequestOpenMailbox: (this: void) => void
declare function IsReadMailInfoReady(this: void, mailId?: Id64): boolean
declare function QueueItemAttachment(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  attachmentSlot?: number
): number
declare function GetNumAchievementCategories(this: void): number
declare function GetAchievementCategoryInfo(
  this: void,
  topLevelIndex?: number
): LuaMultiReturn<
  [
    name: string,
    numSubCatgories: number,
    numAchievements: number,
    earnedPoints: number,
    totalPoints: number,
    hidesPoints: boolean,
  ]
>
declare function GetAchievementSubCategoryInfo(
  this: void,
  topLevelIndex?: number,
  subCategoryIndex?: number
): LuaMultiReturn<
  [
    name: string,
    numAchievements: number,
    earnedPoints: number,
    totalPoints: number,
    hidesPoints: boolean,
  ]
>
declare function GetAchievementId(
  this: void,
  topLevelIndex?: number,
  categoryIndex?: number | undefined,
  achievementIndex?: number
): number
declare function GetAchievementProgress(this: void, achievementId?: number): Id64
declare function GetCategoryInfoFromAchievementId(
  this: void,
  achievementId?: number
): LuaMultiReturn<
  [
    topLevelIndex: number | undefined,
    categoryIndex: number | undefined,
    achievementIndex: number | undefined,
  ]
>
declare function GetFirstAchievementInLine(this: void, achievementId?: number): number
declare function GetNextAchievementInLine(this: void, achievementId?: number): number
declare function GetAchievementLink(this: void, achievementId?: number, linkStyle?: number): string
declare function GetAchievementIdFromLink(this: void, link?: string): number
declare function GetAchievementNameFromLink(this: void, link?: string): string
declare function GetAchievementRewardPoints(this: void, achievementId?: number): number
declare function GetSkyshardAchievementZoneId(this: void, achievementId?: number): number
declare function GetAchievementLinkedBookCollectionId(this: void, achievementId?: number): number
declare function GetNumExperiencePointsInCompanionLevel(
  this: void,
  level?: number
): number | undefined
declare function IsEnlightenedAvailableForCharacter(this: void): boolean
declare function GetMaxSpendableChampionPointsInAttribute(this: void): number
declare function GetMaxLevel(this: void): number
declare function GetAbilityProgressionAbilityId(
  this: void,
  progressionIndex?: number,
  morph?: number,
  rank?: number
): number
declare function GetProgressionSkillAbilityFxOverrideCollectibleIdByIndex(
  this: void,
  progressionId?: number,
  index?: number
): number
declare function GetActiveProgressionSkillAbilityFxOverrideCollectibleId(
  this: void,
  progressionId?: number
): number
declare const PurchaseAttributes: (
  this: void,
  health?: number,
  magicka?: number,
  stamina?: number
) => void
declare const SendAttributePointAllocationRequest: (
  this: void,
  respecPaymentType?: RespecPaymentType,
  healthDelta?: number,
  magickaDelta?: number,
  staminaDelta?: number
) => void
declare function GetAttributeSpentPoints(this: void, attributeType?: number): number
declare function GetAttributeUnspentPoints(this: void): number
declare const StartAttributeRespecFromUI: (this: void) => void
declare function GetNumLoreCategories(this: void): number
declare function GetLoreCategoryInfo(
  this: void,
  categoryIndex?: number
): LuaMultiReturn<[name: string, numCollections: number, categoryId: number]>
declare function GetLoreCollectionInfo(
  this: void,
  categoryIndex?: number,
  collectionIndex?: number
): LuaMultiReturn<
  [
    name: string,
    description: string,
    numKnownBooks: number,
    totalBooks: number,
    hidden: boolean,
    gamepadIcon: string,
    collectionId: number,
  ]
>
declare function GetLoreBookInfo(
  this: void,
  categoryIndex?: number,
  collectionIndex?: number,
  bookIndex?: number
): LuaMultiReturn<[title: string, icon: string, known: boolean, bookId: number]>
declare function GetLoreBookLink(
  this: void,
  categoryIndex?: number,
  collectionIndex?: number,
  bookIndex?: number,
  linkStyle?: number
): string
declare function GetLoreBookTitleFromLink(this: void, link?: string): string
declare function GetLoreBookCollectionIndicesFromCollectionId(
  this: void,
  collectionId?: number
): LuaMultiReturn<[categoryIndex: number | undefined, collectionIndex: number | undefined]>
declare function GetLoreBookIndicesFromBookId(
  this: void,
  bookId?: number
): LuaMultiReturn<
  [
    categoryIndex: number | undefined,
    collectionIndex: number | undefined,
    bookIndex: number | undefined,
  ]
>
declare function GetLoreBookOverrideImageFromBookId(
  this: void,
  bookId?: number
): LuaMultiReturn<
  [overrideImage: string | undefined, overrideImageTitlePosition: AnchorPosition | undefined]
>
declare function GetNumUnlockedHirelingCorrespondence(
  this: void,
  hirelingType?: HirelingType
): LuaMultiReturn<[current: number, max: number]>
declare function GetHirelingCorrespondenceInfoByIndex(
  this: void,
  hirelingType?: HirelingType,
  index?: number
): LuaMultiReturn<[sender: string, subject: string, message: string, icon: string]>
declare function GetCraftingInteractionMode(this: void): CraftingInteractionMode
declare function GetCraftingInteractionType(this: void): TradeskillType
declare function IsAwaitingCraftingProcessResponse(this: void): boolean
declare function GetLastCraftingResultTotalInspiration(this: void): number
declare function GetNumLastCraftingResultLearnedTraits(this: void): number
declare function GetLastCraftingResultLearnedTraitInfo(
  this: void,
  resultIndex?: number
): LuaMultiReturn<
  [
    traitName: string,
    itemName: string,
    icon: string,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: EquipType,
    itemStyleId: number,
    displayQuality: ItemDisplayQuality,
  ]
>
declare function GetLastCraftingResultItemLink(
  this: void,
  resultIndex?: number,
  linkStyle?: number
): string
declare const PrepareDeconstructMessage: (this: void) => void
declare function AddItemToDeconstructMessage(
  this: void,
  bagId?: Bag,
  slotIndex?: number,
  quantity?: number
): boolean
declare function SendDeconstructMessage(this: void): boolean
declare function GetNonCombatBonusLevelTypeForTradeskillType(
  this: void,
  tradeskillType?: TradeskillType
): NonCombatBonusType
declare function GetMaxIterationsPossibleForAlchemyItem(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  reagent1BagId?: Bag,
  reagent1SlotIndex?: number,
  reagent2BagId?: Bag,
  reagent2SlotIndex?: number,
  reagent3BagId?: Bag | undefined,
  reagent3SlotIndex?: number | undefined
): LuaMultiReturn<[numIterations: number, limitReason: TradeskillResult]>
declare const CraftAlchemyItem: (
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  reagent1BagId?: Bag,
  reagent1SlotIndex?: number,
  reagent2BagId?: Bag,
  reagent2SlotIndex?: number,
  reagent3BagId?: Bag | undefined,
  reagent3SlotIndex?: number | undefined,
  numIterations?: number
) => void
declare function GetAlchemyResultingItemInfo(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  reagent1BagId?: Bag,
  reagent1SlotIndex?: number,
  reagent2BagId?: Bag,
  reagent2SlotIndex?: number,
  reagent3BagId?: Bag | undefined,
  reagent3SlotIndex?: number | undefined
): LuaMultiReturn<
  [
    name: string,
    icon: string,
    stack: number,
    sellPrice: number,
    meetsUsageRequirement: boolean,
    equipType: EquipType,
    itemStyleId: number,
    displayQuality: ItemDisplayQuality,
    prospectiveAlchemyResult: ProspectiveAlchemyResult,
  ]
>
declare function GetAlchemyResultingItemLink(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  reagent1BagId?: Bag,
  reagent1SlotIndex?: number,
  reagent2BagId?: Bag,
  reagent2SlotIndex?: number,
  reagent3BagId?: Bag | undefined,
  reagent3SlotIndex?: number | undefined,
  linkStyle?: number
): LuaMultiReturn<[link: string, prospectiveAlchemyResult: ProspectiveAlchemyResult]>
declare function GetAlchemyResultQuantity(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  numIterations?: number
): number
declare function GetAlchemyItemTraits(
  this: void,
  reagentBagId?: Bag,
  reagentSlotIndex?: number
): LuaMultiReturn<
  [
    trait: string | undefined,
    icon: string | undefined,
    matchIcon: string | undefined,
    cancellingTrait: string | undefined,
    conflictIcon: string | undefined,
    ...rest: (string | undefined)[],
  ]
>
declare function GetTraitIdFromBasePotion(this: void, itemId?: number): number
declare function IsAlchemySolvent(this: void, itemType?: ItemType): boolean
declare function IsAlchemySolventForItemAndMaterialId(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  targetItemId?: number,
  targetMaterialItemId?: number
): boolean
declare function GetAlchemyResultingItemIdIfKnown(
  this: void,
  solventBagId?: Bag,
  solventSlotIndex?: number,
  reagent1BagId?: Bag,
  reagent1SlotIndex?: number,
  reagent2BagId?: Bag,
  reagent2SlotIndex?: number,
  reagent3BagId?: Bag | undefined,
  reagent3SlotIndex?: number | undefined,
  desiredEncodedTraits?: number | undefined
): number | undefined
declare function GetNumRecipeLists(this: void): number
declare function GetRecipeListInfo(
  this: void,
  recipeListIndex?: number
): LuaMultiReturn<
  [
    name: string,
    numRecipes: number,
    upIcon: string,
    downIcon: string,
    overIcon: string,
    deprecatedReturn: string,
    createSound: string,
  ]
>
declare function GetRecipeInfo(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number
): LuaMultiReturn<
  [
    known: boolean,
    name: string,
    numIngredients: number,
    provisionerLevelReq: number,
    qualityReq: number,
    specialIngredientType: ProvisionerSpecialIngredientType,
    requiredCraftingStationType: TradeskillType,
    resultItemId: number,
  ]
>
declare function GetRecipeIngredientRequiredQuantity(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number,
  ingredientIndex?: number
): number
declare function GetRecipeIngredientItemInfo(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number,
  ingredientIndex?: number
): LuaMultiReturn<
  [
    name: string,
    icon: string,
    requiredQuantity: number,
    sellPrice: number,
    displayQuality: ItemDisplayQuality,
  ]
>
declare function GetRecipeIngredientItemLink(
  this: void,
  recipeListIndex?: number,
  recipeIndex?: number,
  ingredientIndex?: number,
  linkStyle?: number
): string
