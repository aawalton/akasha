type ChatMessageFormatter = (this: void, ...args: unknown[]) => LuaMultiReturn<unknown[]>

type ChatFormatterTable = Record<string | number, ChatMessageFormatter>

interface ChatRouter {
  GetRegisteredMessageFormatters(): ChatFormatterTable
  RegisterMessageFormatter(key: string, formatter: ChatMessageFormatter): void
  FormatAndAddChatMessage(...args: unknown[]): void
  registeredMessageFormatters: ChatFormatterTable
}

declare function ZO_ChatSystem_GetEventCategoryMappings(
  this: void
): LuaMultiReturn<[unknown, Record<string, number>]>

declare function zo_strsplit(this: void, separator: string, text: string): LuaMultiReturn<string[]>

declare function ZO_LinkHandler_CreateLink(
  this: void,
  text: string,
  color: unknown,
  linkType: string,
  ...data: unknown[]
): string
declare function ZO_LinkHandler_CreateLinkWithoutBrackets(
  this: void,
  text: string,
  color: unknown,
  linkType: string,
  ...data: unknown[]
): string

declare const ZO_VALID_LINK_TYPES_CHAT: Record<string, boolean>

type LinkHandlerCallback = (
  this: void,
  link: string,
  button: number,
  text: string,
  color: unknown,
  linkType: string,
  ...rest: unknown[]
) => boolean | undefined

interface LinkHandler {
  LINK_CLICKED_EVENT: string
  LINK_MOUSE_UP_EVENT: string
  RegisterCallback(eventName: string, callback: LinkHandlerCallback): void
}
declare const LINK_HANDLER: LinkHandler

interface ChatWindowBuffer {
  Clear(): void
}
interface ChatWindow {
  buffer: ChatWindowBuffer
}
interface ChatWindowPool {
  GetActiveObjects(): Record<number, ChatWindow>
}
interface ChatEditControl {
  SetAllowMarkupType(markupType: number): void
}
interface KeyboardChatSystem {
  windowPool: ChatWindowPool
  GetEditControl(): ChatEditControl
}
declare const KEYBOARD_CHAT_SYSTEM: KeyboardChatSystem

declare const SLASH_COMMANDS: Record<string, (this: void, params: string) => void>

declare let LibChatMessageSettings: Record<string, unknown> | undefined
declare let LibChatMessageHistory: Record<string, unknown> | undefined

declare function ZO_Alert(this: void, category: number, sound: string, message: string): void

declare function zo_callLater(this: void, fn: (this: void) => void, ms: number): number

declare const LIB_CHATMESSAGE_UNKNOWN_DESCRIPTION: number
