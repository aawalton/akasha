import type { StringRecord } from "../chat-message-casts/chat-message-casts.module.code.ts"
import {
  asChatEventKey,
  asHistoryArray,
  asSettings,
} from "../chat-message-casts/chat-message-casts.module.code.ts"
import {
  LIB_IDENTIFIER,
  UNKNOWN_LINK_TYPE,
} from "../chat-message-constants/chat-message-constants.module.code.ts"
import { LIB } from "../chat-message-lib/chat-message-lib.module.code.ts"
import { registerSlashCommand } from "../chat-message-slash-command/chat-message-slash-command.module.code.ts"
import type { HistoryEntry } from "../chat-message-types/chat-message-types.module.code.ts"
import { createChatProxy } from "../chat-proxy/chat-proxy.module.code.ts"
import { readFromSavedVariable } from "../chat-saved-data/chat-saved-data.module.code.ts"

export function registerLifecycle(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(
    LIB_IDENTIFIER,
    EVENT_ADD_ON_LOADED,
    function (this: void, _eventCode: number, name: string): undefined {
      if (name !== LIB_IDENTIFIER) {
        return
      }

      const saveDataKey = GetWorldName() + GetDisplayName()
      LIB.saveDataKey = saveDataKey

      const chat = createChatProxy("LibChatMessage", "LCM")
      registerSlashCommand(chat)

      const settingsStore = LibChatMessageSettings ?? ({} as StringRecord)
      LibChatMessageSettings = settingsStore
      const historyStore = LibChatMessageHistory ?? ({} as StringRecord)
      LibChatMessageHistory = historyStore

      const settings = asSettings(
        settingsStore[saveDataKey] ?? ZO_ShallowTableCopy(LIB.defaultSettings)
      )
      settingsStore[saveDataKey] = settings
      LIB.settings = settings

      const held: unknown = settings
      const settingsRecord = held as StringRecord
      const defaults: unknown = LIB.defaultSettings
      const defaultsRecord = defaults as StringRecord
      for (const [key, value] of pairs(defaultsRecord)) {
        if (settingsRecord[key] === undefined) {
          settingsRecord[key] = value
        }
      }
      for (const [key] of pairs(settingsRecord)) {
        if (defaultsRecord[key] === undefined) {
          settingsRecord[key] = undefined
        }
      }

      LIB.chatHistoryActive = settings.historyEnabled

      function restoreChatHistoryEntry(this: void, entry: HistoryEntry): undefined {
        LIB.nextEventTimeStamp = entry[0] as number
        const eventKey = asChatEventKey(readFromSavedVariable(entry[1]))
        const args: unknown[] = []
        for (let i = 2; i < entry.length; i += 1) {
          args[args.length] = readFromSavedVariable(entry[i])
        }
        CHAT_ROUTER.FormatAndAddChatMessage(eventKey, ...args)
      }

      function restoreChatHistory(this: void): undefined {
        if (!LIB.chatHistoryActive) {
          return
        }
        LIB.ClearChat()

        const newHistory: HistoryEntry[] = []
        const oldHistory =
          historyStore[saveDataKey] !== undefined
            ? asHistoryArray(historyStore[saveDataKey])
            : undefined
        const tempHistory = LIB.chatHistory

        if (oldHistory !== undefined) {
          const ageThreshold = GetTimeStamp() - settings.historyMaxAge
          for (let i = 0; i < oldHistory.length; i += 1) {
            const item = oldHistory[i]
            if (item !== undefined && (item[0] as number) > ageThreshold) {
              restoreChatHistoryEntry(item)
            }
          }
        }

        if (LIB.nextEventTimeStamp !== undefined) {
          LIB.nextEventTimeStamp = GetTimeStamp()
          chat.Print("End of restored chat history")
        }

        for (let i = 0; i < tempHistory.length; i += 1) {
          const item = tempHistory[i]
          if (item !== undefined) {
            restoreChatHistoryEntry(item)
          }
        }

        LIB.nextEventTimeStamp = undefined
        LIB.chatHistory = newHistory
        historyStore[saveDataKey] = newHistory
      }

      EVENT_MANAGER.RegisterForEvent(
        LIB_IDENTIFIER,
        EVENT_PLAYER_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(LIB_IDENTIFIER, EVENT_PLAYER_ACTIVATED)
          zo_callLater(restoreChatHistory, 0)
        }
      )

      if (!LIB.chatHistoryActive) {
        LIB.ClearHistory()
      }

      function onLinkClicked(
        this: void,
        _link: string,
        button: number,
        _text: string,
        _color: unknown,
        linkType: string,
        ...rest: unknown[]
      ): boolean | undefined {
        if (linkType !== UNKNOWN_LINK_TYPE) {
          return undefined
        }
        if (button === MOUSE_BUTTON_INDEX_LEFT) {
          const unknownType = rest[0]
          ZO_Alert(
            EVENT_UI_ERROR,
            SOUNDS.NEGATIVE_CLICK as string,
            zo_strformat(LIB_CHATMESSAGE_UNKNOWN_DESCRIPTION, unknownType)
          )
          return true
        }
        return undefined
      }
      LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_CLICKED_EVENT, onLinkClicked)
      LINK_HANDLER.RegisterCallback(LINK_HANDLER.LINK_MOUSE_UP_EVENT, onLinkClicked)
      if (IsKeyboardUISupported()) {
        KEYBOARD_CHAT_SYSTEM.GetEditControl().SetAllowMarkupType(ALLOW_MARKUP_TYPE_ALL)
      }
    }
  )
}
