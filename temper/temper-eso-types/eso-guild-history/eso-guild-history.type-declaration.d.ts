declare const GUILD_HISTORY_EVENT_CATEGORY_ITERATION_BEGIN: number
declare const GUILD_HISTORY_EVENT_CATEGORY_ITERATION_END: number

interface GuildHistoryEventInfo {
  [key: string]: unknown
}

interface GuildHistoryEventObject {
  GetEventId: (this: GuildHistoryEventObject) => number
  GetEventTimestampS: (this: GuildHistoryEventObject) => number
  GetEventCategory: (this: GuildHistoryEventObject) => number
  GetEventType: (this: GuildHistoryEventObject) => number
  GetEventInfo: (this: GuildHistoryEventObject) => GuildHistoryEventInfo
}

interface GuildHistoryEventCategoryInfo {
  subcategories: unknown[]
  [key: string]: unknown
}

interface GuildHistoryEventCategoryData {
  CanHaveRedactedEvents: (this: GuildHistoryEventCategoryData) => boolean
  GetStartingIndexForPage: (
    this: GuildHistoryEventCategoryData,
    page: number,
    entriesPerPage: number,
    subcategoryIndex: number | undefined
  ) => number | undefined
  GetStartingAndEndingIndexForPage: (
    this: GuildHistoryEventCategoryData,
    page: number,
    entriesPerPage: number,
    subcategoryIndex: number | undefined
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
}

interface GuildHistoryGuildData {
  GetEventCategoryData: (
    this: GuildHistoryGuildData,
    eventCategory: number
  ) => GuildHistoryEventCategoryData
}

interface GuildHistoryManager {
  GetEventCategoryInfo: (this: void, category: number) => GuildHistoryEventCategoryInfo | undefined
  GetGuildData: (this: GuildHistoryManager, guildId: number) => GuildHistoryGuildData
}

declare const GUILD_HISTORY_MANAGER: GuildHistoryManager

interface ZoGuildHistoryKeyboard {
  [key: string]: unknown
}

declare const ZO_GuildHistory_Keyboard: ZoGuildHistoryKeyboard

declare const ZO_GuildHistory_Keyboard_TL: TopLevelWindow

interface GuildSelector {
  guildWindows: object[]
  [key: string]: unknown
}

declare const GUILD_SELECTOR: GuildSelector

interface ZoGuildHistoryRequest {
  requestId: number
  guildId: number
  eventCategory: number
  newestTimeS?: number
  oldestTimeS?: number
  GetRequestId: (this: ZoGuildHistoryRequest) => number
  IsValid: (this: ZoGuildHistoryRequest) => boolean
  IsComplete: (this: ZoGuildHistoryRequest) => boolean
  IsRequestQueued: (this: ZoGuildHistoryRequest) => boolean
  RequestMoreEvents: (this: ZoGuildHistoryRequest) => number
}

interface ZoGuildHistoryRequestClass {
  New: (
    this: ZoGuildHistoryRequestClass,
    guildId: number,
    category: number,
    newestTime: number | undefined,
    oldestTime: number | undefined
  ) => ZoGuildHistoryRequest
}

declare const ZO_GuildHistoryRequest: ZoGuildHistoryRequestClass
