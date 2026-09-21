interface ChatAutoCompleteWidget {
  enabled?: boolean
  [key: string]: unknown
}

interface ChatTextEntry {
  GetText: () => string
  editControl: {
    HasFocus: () => boolean
    InsertText: (text: string) => void
  }
  targetAutoComplete: ChatAutoCompleteWidget
  slashCommandAutoComplete: ChatAutoCompleteWidget
  AutoCompleteTarget: (this: ChatTextEntry, text: string) => undefined
  CloseAutoComplete: (this: ChatTextEntry) => undefined
}

interface KeyboardChatSystem {
  textEntry: ChatTextEntry
  ignoreTextEntryChangedEvent?: boolean
}
declare const KEYBOARD_CHAT_SYSTEM: KeyboardChatSystem
interface ChatNotificationTimeline {
  Stop: () => void
  PlayFromStart: () => void
}
interface SharedChatSystem {
  textEntry: ChatTextEntry
  AddMessage: (message: string) => void
  currentChannel?: number
  currentNumNotifications?: number
  notificationPulseTimeline: ChatNotificationTimeline
}
declare const CHAT_SYSTEM: SharedChatSystem

interface ChatRouter {
  AddSystemMessage: (message: string) => void
  FormatAndAddChatMessage: (eventName: string | number, ...args: unknown[]) => void
}
declare const CHAT_ROUTER: ChatRouter

declare const StartChatInput: (text?: string, channel?: number, target?: string) => void
