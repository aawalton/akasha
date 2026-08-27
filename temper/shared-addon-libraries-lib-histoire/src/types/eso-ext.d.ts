interface ZoInitializingObjectClass {
  Subclass<T = object>(): T
}
declare const ZO_InitializingObject: ZoInitializingObjectClass

interface ZoObjectClass {
  Subclass<T = object>(): T
  New: <T = object>(this: void, self: object) => T
}
declare const ZO_Object: ZoObjectClass

interface LinkHandler {
  LINK_CLICKED_EVENT: string
  LINK_MOUSE_UP_EVENT: string
  RegisterCallback(
    this: LinkHandler,
    eventName: string,
    callback: (this: void, ...args: never[]) => unknown
  ): void
}
declare const LINK_HANDLER: LinkHandler

interface GuildHistoryManager {
  GetGuildData(this: GuildHistoryManager, guildId: number): unknown
}
declare const GUILD_HISTORY_MANAGER: GuildHistoryManager

interface ZoGuildHistoryKeyboard {
  [key: string]: unknown
}
declare const ZO_GuildHistory_Keyboard: ZoGuildHistoryKeyboard
