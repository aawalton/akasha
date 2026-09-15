declare const ITEM_LINK_TYPE: string
declare function ZO_LinkHandler_CreateLink(
  text: string,
  color: string | undefined,
  linkType: string,
  ...data: (string | number)[]
): string

declare function getItemLinkFromItemId(this: void, itemId: number): string
declare function ZO_GetClassIcon(classId: number): string

declare const ZO_ZONE_STORY_ACTIVITY_COMPLETION_TYPES_SORTED_LIST: string[]

interface ZoneStoriesManager {
  GetCompletionTypeIcon: (completionType: string) => string
}
declare const ZO_ZoneStories_Manager: ZoneStoriesManager
declare function GetNumAchievements(): number
declare function GetSkillLineInfo(
  skillType: number,
  skillLineIndex: number
): LuaMultiReturn<[string, number, boolean, number, boolean, string, boolean]>
declare const SKILL_TYPE_ITERATION_BEGIN: number
declare const SKILL_TYPE_ITERATION_END: number

interface SkillLineData {
  IsDiscovered: () => boolean
  IsActive: () => boolean
  GetSkillLineIndex: () => number
  GetCurrentRank: () => number
  GetCurrentRankXP: () => number
  GetNextRankXP: () => number
  GetLastRankXP: () => number
  GetIndices: () => LuaMultiReturn<[number, number]>
}

interface SkillTypeData {
  SkillLineIterator: () => LuaIterable<LuaMultiReturn<[number, SkillLineData]>>
  orderedSkillLines: SkillLineData[]
}

interface ActiveClassSkillLineData {
  id: number
}

interface PassiveSkillData {
  skillLineData: { skillTypeData: { skillType: number } }
  isPurchased: boolean
  currentRank: number
  skillProgressions: Record<number, { abilityId: number }>
}

interface SkillProgressionData {
  abilityId: number
  skillData:
    | { skillLineData: { id: number; skillTypeData: { skillType: number } } | undefined }
    | undefined
}

interface SkillsDataManager {
  GetSkillLineDataByIndices: (skillType: number, lineIndex: number) => SkillLineData | undefined
  GetCraftingSkillLineData: (tradeskillType: number) => SkillLineData | undefined
  SkillTypeIterator: () => LuaIterable<LuaMultiReturn<[number, SkillTypeData]>>
  activeClassSkillLineDataList: Record<number, ActiveClassSkillLineData> | undefined
  passiveSkillObjectPool: { GetActiveObjects: () => Record<number, PassiveSkillData> } | undefined
  abilityIdToProgressionDataMap: Record<number, SkillProgressionData> | undefined
}
declare const SKILLS_DATA_MANAGER: SkillsDataManager

interface GuildBrowserGuildInfoKeyboard {
  SetGuildToShow: (guildId: number) => void
  closeCallback: ((this: void) => void) | undefined
}
declare const GUILD_BROWSER_GUILD_INFO_KEYBOARD: GuildBrowserGuildInfoKeyboard

interface MainMenuKeyboard {
  ShowSceneGroup: (sceneGroupName: string, sceneName?: string) => void
}
declare const MAIN_MENU_KEYBOARD: MainMenuKeyboard

interface ChampionSkillData {
  championSkillId: number
  GetNumSavedPoints: () => number
  IsTypeSlottable: () => boolean
}

interface ChampionDisciplineData {
  disciplineId: number
  championSkillDatas: Record<number, ChampionSkillData>
  GetNumSavedSpentPoints: () => number
}

interface ChampionDataManager {
  disciplineDatas: Record<number, ChampionDisciplineData>
}
declare const CHAMPION_DATA_MANAGER: ChampionDataManager

interface ZO_SavedVars {
  NewAccountWide: <T extends object>(
    savedVariableTable: string,
    version: number | string,
    namespace: string | undefined,
    defaults: T,
    worldName?: string,
    displayName?: string
  ) => T
  NewCharacterIdSettings: <T extends object>(
    savedVariableTable: string,
    version: number | string,
    namespace: string | undefined,
    defaults: T,
    worldName?: string
  ) => T
  NewCharacterNameSettings: <T extends Record<string, unknown>>(
    savedVariableTable: string,
    version: number | string,
    namespace: string | undefined,
    defaults: T,
    worldName?: string
  ) => T
  New: <T extends object>(
    savedVariableTable: string,
    version: number | string,
    namespace: string | undefined,
    defaults: T,
    worldName?: string,
    displayName?: string,
    characterName?: string
  ) => T
}
declare const ZO_SavedVars: ZO_SavedVars

declare function GetItemLinkQuality(itemLink: string): number

declare function GetCurrentMoney(): number

interface CompanionOverviewKeyboard {
  RefreshCompanionRapport: () => void
  rapportStatusLabel: LabelControl | undefined
}
declare const COMPANION_OVERVIEW_KEYBOARD: CompanionOverviewKeyboard

declare function ZO_Smithing_IsConsolidatedStationCraftingMode(): boolean

declare function ZO_IsConsoleOrGameCoreUI(): boolean

declare function ZO_IsElementInNonContiguousTable(table: unknown, element: unknown): boolean

declare function ZO_GenerateCommaSeparatedListWithAnd(list: unknown): string

declare function ZO_Enchanting_GetVisibleEnchanting(): Record<string, unknown>

declare const ApplyTemplateToControl: (control: unknown, templateName: string) => void

declare const ZO_Alert: (category: number, sound: unknown, message: string | number) => void

declare function GetItemQuality(bagId: number, slotIndex: number): number

declare const SMITHING_MODE_CREATION: number

declare const SMITHING: Record<string, unknown>
declare const SMITHING_GAMEPAD: Record<string, unknown>
declare const ZO_MailInboxMessage: Record<string, unknown>
declare const ZO_MailInboxMessageBody: Record<string, unknown>
declare const ZO_MailInboxMessageSubject: Record<string, unknown>

interface PromotionalEventManager {
  activeCampaignDataList: Record<number, unknown>
  callbackRegistry: Record<string, Record<number, unknown[]>>
  RefreshCampaignData: (this: PromotionalEventManager) => void
  GetCampaignDataByKey: (this: PromotionalEventManager, campaignKey: unknown) => unknown
  OnActivityProgressUpdated: (this: PromotionalEventManager, campaignId: unknown) => void
  GetPrimaryTimedActivitiesCurrencyType: (this: void) => number
  [key: string]: unknown
}
declare const PROMOTIONAL_EVENT_MANAGER: PromotionalEventManager

declare const ZO_SAVED_VARS_CHARACTER_NAME_KEY: number

declare const ZO_SAVED_VARS_CHARACTER_ID_KEY: number

declare function ZO_IsElementInNumericallyIndexedTable(
  array: readonly unknown[],
  element: unknown
): boolean
