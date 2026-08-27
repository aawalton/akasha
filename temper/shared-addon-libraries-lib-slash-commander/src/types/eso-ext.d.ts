import type { AutoCompleteProvider } from "../types"

declare global {
  interface ZoObjectClass {
    Subclass<T = object>(this: ZoObjectClass): T
    New<T = object>(this: void, self: object): T
  }
  const ZO_Object: ZoObjectClass

  interface ChatAutoCompleteWidget {
    enabled?: boolean
    [key: string]: unknown
  }

  interface ChatTextEntry {
    targetAutoComplete: ChatAutoCompleteWidget
    slashCommandAutoComplete: ChatAutoCompleteWidget
    AutoCompleteTarget: (this: ChatTextEntry, text: string) => void
    CloseAutoComplete: (this: ChatTextEntry) => void
    [key: string]: unknown
  }

  interface ChatSystem {
    textEntry: ChatTextEntry
    ignoreTextEntryChangedEvent?: boolean
    [key: string]: unknown
  }

  const KEYBOARD_CHAT_SYSTEM: ChatSystem | undefined
  const GAMEPAD_CHAT_SYSTEM: ChatSystem | undefined

  interface ChatSystemHandle {
    StartTextEntry: (
      this: ChatSystemHandle,
      text: string,
      channel?: number,
      target?: string,
      keepOpenAfter?: boolean
    ) => void
  }
  function ZO_GetChatSystem(this: void): ChatSystemHandle

  interface ChannelSwitchEntry {
    id: number
    name: string
    dynamicName?: boolean
  }
  function ZO_ChatSystem_GetChannelSwitchLookupTable(this: void): Record<string, ChannelSwitchEntry>

  function GetTopMatchesByLevenshteinSubStringScore(
    this: void,
    list: object,
    searchString: string,
    minScore: number,
    maxResults: number | undefined,
    returnList: boolean
  ): AutoCompleteProvider["results"][] | undefined

  function CanCommunicateWith(this: void, characterOrDisplayName: string): boolean
}

declare global {
  const SI_SLASH_SCRIPT: number
  const SI_SLASH_CHATLOG: number
  const SI_SLASH_GROUP_INVITE: number
  const SI_SLASH_JUMP_TO_LEADER: number
  const SI_SLASH_JUMP_TO_GROUP_MEMBER: number
  const SI_SLASH_JUMP_TO_FRIEND: number
  const SI_SLASH_JUMP_TO_GUILD_MEMBER: number
  const SI_SLASH_RELOADUI: number
  const SI_SLASH_PLAYED_TIME: number
  const SI_SLASH_READY_CHECK: number
  const SI_SLASH_DUEL_INVITE: number
  const SI_SLASH_LOGOUT: number
  const SI_SLASH_CAMP: number
  const SI_SLASH_QUIT: number
  const SI_SLASH_FPS: number
  const SI_SLASH_LATENCY: number
  const SI_SLASH_STUCK: number
  const SI_SLASH_REPORT_BUG: number
  const SI_SLASH_REPORT_FEEDBACK: number
  const SI_SLASH_REPORT_HELP: number
  const SI_SLASH_REPORT_CHAT: number
  const SI_SLASH_ENCOUNTER_LOG: number
}
