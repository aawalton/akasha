declare const GUILD_HISTORY_ALLIANCE_WAR: number
declare const GUILD_HISTORY_ALLIANCE_WAR_ITERATION_BEGIN: number
declare const GUILD_HISTORY_ALLIANCE_WAR_ITERATION_END: number
declare const GUILD_HISTORY_ALLIANCE_WAR_MAX_VALUE: number
declare const GUILD_HISTORY_ALLIANCE_WAR_MIN_VALUE: number
declare const GUILD_HISTORY_ALLIANCE_WAR_OWNERSHIP: number
declare const GUILD_HISTORY_BANK: number
declare const GUILD_HISTORY_BANK_DEPOSITS: number
declare const GUILD_HISTORY_BANK_ITERATION_BEGIN: number
declare const GUILD_HISTORY_BANK_ITERATION_END: number
declare const GUILD_HISTORY_BANK_MAX_VALUE: number
declare const GUILD_HISTORY_BANK_MIN_VALUE: number
declare const GUILD_HISTORY_BANK_WITHDRAWALS: number
declare const GUILD_HISTORY_COMBAT: number
declare const GUILD_HISTORY_GENERAL: number
declare const GUILD_HISTORY_GENERAL_CUSTOMIZATION: number
declare const GUILD_HISTORY_GENERAL_ITERATION_BEGIN: number
declare const GUILD_HISTORY_GENERAL_ITERATION_END: number
declare const GUILD_HISTORY_GENERAL_MAX_VALUE: number
declare const GUILD_HISTORY_GENERAL_MIN_VALUE: number
declare const GUILD_HISTORY_GENERAL_ROSTER: number
declare const GUILD_HISTORY_GENERAL_UNLOCKS: number
declare const GUILD_HISTORY_ITERATION_BEGIN: number
declare const GUILD_HISTORY_ITERATION_END: number
declare const GUILD_HISTORY_MAX_VALUE: number
declare const GUILD_HISTORY_MIN_VALUE: number
declare const GUILD_HISTORY_STORE: number
declare const GUILD_HISTORY_STORE_HIRED_TRADER: number
declare const GUILD_HISTORY_STORE_ITERATION_BEGIN: number
declare const GUILD_HISTORY_STORE_ITERATION_END: number
declare const GUILD_HISTORY_STORE_MAX_VALUE: number
declare const GUILD_HISTORY_STORE_MIN_VALUE: number
declare const GUILD_HISTORY_STORE_PURCHASES: number

declare const GUILD_EVENT_ABOUT_US_EDITED: number
declare const GUILD_EVENT_ADDED_TO_BLACKLIST: number
declare const GUILD_EVENT_BANKGOLD_ADDED: number
declare const GUILD_EVENT_BANKGOLD_GUILD_STORE_TAX: number
declare const GUILD_EVENT_BANKGOLD_KIOSK_BID: number
declare const GUILD_EVENT_BANKGOLD_KIOSK_BID_REFUND: number
declare const GUILD_EVENT_BANKGOLD_PURCHASE_HERALDRY: number
declare const GUILD_EVENT_BANKGOLD_REMOVED: number
declare const GUILD_EVENT_BANKITEM_ADDED: number
declare const GUILD_EVENT_BANKITEM_REMOVED: number
declare const GUILD_EVENT_BATTLE_STANDARD_PICKUP: number
declare const GUILD_EVENT_BATTLE_STANDARD_PUTDOWN: number
declare const GUILD_EVENT_EDIT_BLACKLIST_NOTE: number
declare const GUILD_EVENT_GUILD_APPLICATION_ACCEPTED: number
declare const GUILD_EVENT_GUILD_APPLICATION_DECLINED: number
declare const GUILD_EVENT_GUILD_BANK_LOCKED: number
declare const GUILD_EVENT_GUILD_BANK_UNLOCKED: number
declare const GUILD_EVENT_GUILD_CREATE: number
declare const GUILD_EVENT_GUILD_DELETE: number
declare const GUILD_EVENT_GUILD_DEMOTE: number
declare const GUILD_EVENT_GUILD_INVITE: number
declare const GUILD_EVENT_GUILD_INVITEDECLINED: number
declare const GUILD_EVENT_GUILD_INVITEPURGED: number
declare const GUILD_EVENT_GUILD_INVITEREVOKED: number
declare const GUILD_EVENT_GUILD_JOIN: number
declare const GUILD_EVENT_GUILD_KICKED: number
declare const GUILD_EVENT_GUILD_KIOSK_LOCKED: number
declare const GUILD_EVENT_GUILD_KIOSK_PURCHASED: number
declare const GUILD_EVENT_GUILD_KIOSK_PURCHASE_REFUND: number
declare const GUILD_EVENT_GUILD_KIOSK_UNLOCKED: number
declare const GUILD_EVENT_GUILD_LEAVE: number
declare const GUILD_EVENT_GUILD_PROMOTE: number
declare const GUILD_EVENT_GUILD_RECRUITMENT_GUILD_LISTED: number
declare const GUILD_EVENT_GUILD_RECRUITMENT_GUILD_UNLISTED: number
declare const GUILD_EVENT_GUILD_REMOVE: number
declare const GUILD_EVENT_GUILD_STANDARD_LOCKED: number
declare const GUILD_EVENT_GUILD_STANDARD_UNLOCKED: number
declare const GUILD_EVENT_GUILD_STORE_LOCKED: number
declare const GUILD_EVENT_GUILD_STORE_UNLOCKED: number
declare const GUILD_EVENT_GUILD_TABARD_LOCKED: number
declare const GUILD_EVENT_GUILD_TABARD_UNLOCKED: number
declare const GUILD_EVENT_GUILD_UNINVITE: number
declare const GUILD_EVENT_HERALDRY_EDITED: number
declare const GUILD_EVENT_ITEM_LISTED: number
declare const GUILD_EVENT_ITEM_SOLD: number
declare const GUILD_EVENT_ITERATION_BEGIN: number
declare const GUILD_EVENT_ITERATION_END: number
declare const GUILD_EVENT_KEEP_CLAIMED: number
declare const GUILD_EVENT_KEEP_LOST: number
declare const GUILD_EVENT_KEEP_RELEASED: number
declare const GUILD_EVENT_MAX_VALUE: number
declare const GUILD_EVENT_MIN_VALUE: number
declare const GUILD_EVENT_MOTD_EDITED: number
declare const GUILD_EVENT_NAME_CHANGED: number
declare const GUILD_EVENT_REMOVED_FROM_BLACKLIST: number

interface GuildHistoryEventInfo {
  [key: string]: unknown
}
interface GuildHistoryEventObject {
  GetEventId(this: GuildHistoryEventObject): number
  GetEventTimestampS(this: GuildHistoryEventObject): number
  GetEventCategory(this: GuildHistoryEventObject): number
  GetEventType(this: GuildHistoryEventObject): number
  GetEventInfo(this: GuildHistoryEventObject): GuildHistoryEventInfo
}

interface GuildHistoryEventCategoryInfo {
  subcategories: unknown[]
  [key: string]: unknown
}
interface GuildHistoryEventCategoryData {
  CanHaveRedactedEvents(this: GuildHistoryEventCategoryData): boolean
  GetStartingIndexForPage(
    this: GuildHistoryEventCategoryData,
    page: number,
    entriesPerPage: number,
    subcategoryIndex: number | undefined
  ): number | undefined
  GetStartingAndEndingIndexForPage(
    this: GuildHistoryEventCategoryData,
    page: number,
    entriesPerPage: number,
    subcategoryIndex: number | undefined
  ): LuaMultiReturn<[number | undefined, number | undefined]>
}
interface GuildHistoryGuildData {
  GetEventCategoryData(
    this: GuildHistoryGuildData,
    eventCategory: number
  ): GuildHistoryEventCategoryData
}
interface GuildHistoryManager {
  GetEventCategoryInfo: (this: void, category: number) => GuildHistoryEventCategoryInfo | undefined
  GetGuildData(this: GuildHistoryManager, guildId: number): GuildHistoryGuildData
}

interface ZoGuildHistoryShared {
  [key: string]: unknown
}
declare const ZO_GuildHistory_Shared: ZoGuildHistoryShared
