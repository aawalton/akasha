declare const GUILD_HISTORY_EVENT_CATEGORY_ITERATION_BEGIN: number
declare const GUILD_HISTORY_EVENT_CATEGORY_ITERATION_END: number

interface ZoGuildHistoryShared {
  [key: string]: unknown
}
declare const ZO_GuildHistory_Shared: ZoGuildHistoryShared

interface GuildSelector {
  guildWindows: object[]
  [key: string]: unknown
}
declare const GUILD_SELECTOR: GuildSelector

declare const ZO_ObjectPool_DefaultResetControl: unknown

interface ZoScrollListDataType {
  hideCallback: unknown
  [key: string]: unknown
}
declare function ZO_ScrollList_GetDataTypeTable(
  this: void,
  listControl: Control,
  typeId: number
): ZoScrollListDataType
