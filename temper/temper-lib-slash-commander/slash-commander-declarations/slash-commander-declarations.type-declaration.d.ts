interface ChatSystem {
  textEntry: ChatTextEntry
  ignoreTextEntryChangedEvent?: boolean
}

declare const GAMEPAD_CHAT_SYSTEM: ChatSystem | undefined

interface ChannelSwitchEntry {
  id: number
  name: string
  dynamicName?: boolean
}

declare const ZO_ChatSystem_GetChannelSwitchLookupTable: (
  this: void
) => Record<string, ChannelSwitchEntry>

declare const GetTopMatchesByLevenshteinSubStringScore: (
  this: void,
  list: object,
  searchString: string,
  minScore: number,
  maxResults: number | undefined,
  returnList: boolean
) =>
  | import("../slash-commander-types/slash-commander-types.module.code.ts").AutoCompleteProvider["results"][]
  | undefined

declare const SI_SLASH_SCRIPT: number

declare const SI_SLASH_CHATLOG: number

declare const SI_SLASH_GROUP_INVITE: number

declare const SI_SLASH_JUMP_TO_LEADER: number

declare const SI_SLASH_JUMP_TO_GROUP_MEMBER: number

declare const SI_SLASH_JUMP_TO_FRIEND: number

declare const SI_SLASH_JUMP_TO_GUILD_MEMBER: number

declare const SI_SLASH_RELOADUI: number

declare const SI_SLASH_PLAYED_TIME: number

declare const SI_SLASH_READY_CHECK: number

declare const SI_SLASH_DUEL_INVITE: number

declare const SI_SLASH_FPS: number

declare const SI_SLASH_LATENCY: number

declare const SI_SLASH_STUCK: number

declare const SI_SLASH_REPORT_BUG: number

declare const SI_SLASH_REPORT_FEEDBACK: number

declare const SI_SLASH_REPORT_HELP: number

declare const SI_SLASH_REPORT_CHAT: number

declare const SI_SLASH_ENCOUNTER_LOG: number
