import { asHistoryArray, asNumber, asSettings, asString, asStringRecord } from "./casts"
import { createChatProxy } from "./chat-proxy"
import { LIB_IDENTIFIER, UNKNOWN_LINK_TYPE } from "./constants"
import { lib } from "./lib-state"
import { readFromSavedVariable } from "./saved-data"
import { registerSlashCommand } from "./slash-command"
import type { HistoryEntry } from "./types"

export function registerLifecycle(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(
    LIB_IDENTIFIER,
    EVENT_ADD_ON_LOADED,
    function (this: void, _eventCode: number, name: string): undefined {
      if (name !== LIB_IDENTIFIER) {
        return
      }

      const saveDataKey = GetWorldName() + GetDisplayName()
      lib.saveDataKey = saveDataKey

      const chat = createChatProxy("LibChatMessage", "LCM")
      registerSlashCommand(chat)

      const settingsStore = asStringRecord(LibChatMessageSettings ?? {})
      LibChatMessageSettings = settingsStore
      const historyStore = asStringRecord(LibChatMessageHistory ?? {})
      LibChatMessageHistory = historyStore

      const settings = asSettings(
        settingsStore[saveDataKey] ?? ZO_ShallowTableCopy(lib.defaultSettings)
      )
      settingsStore[saveDataKey] = settings
      lib.settings = settings

      const settingsRecord = asStringRecord(settings)
      const defaultsRecord = asStringRecord(lib.defaultSettings)
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

      lib.chatHistoryActive = settings.historyEnabled

      function restoreChatHistoryEntry(this: void, entry: HistoryEntry): undefined {
        lib.nextEventTimeStamp = asNumber(entry[0])
        const args: unknown[] = []
        for (let i = 1; i < entry.length; i += 1) {
          args[args.length] = readFromSavedVariable(entry[i])
        }
        CHAT_ROUTER.FormatAndAddChatMessage(...args)
      }

      function restoreChatHistory(this: void): undefined {
        if (!lib.chatHistoryActive) {
          return
        }
        lib.ClearChat()

        const newHistory: HistoryEntry[] = []
        const oldHistory =
          historyStore[saveDataKey] !== undefined
            ? asHistoryArray(historyStore[saveDataKey])
            : undefined
        const tempHistory = lib.chatHistory

        if (oldHistory !== undefined) {
          const ageThreshold = GetTimeStamp() - settings.historyMaxAge
          for (let i = 0; i < oldHistory.length; i += 1) {
            const item = oldHistory[i]
            if (item !== undefined && asNumber(item[0]) > ageThreshold) {
              restoreChatHistoryEntry(item)
            }
          }
        }

        if (lib.nextEventTimeStamp !== undefined) {
          lib.nextEventTimeStamp = GetTimeStamp()
          chat.Print("End of restored chat history")
        }

        for (let i = 0; i < tempHistory.length; i += 1) {
          const item = tempHistory[i]
          if (item !== undefined) {
            restoreChatHistoryEntry(item)
          }
        }

        lib.nextEventTimeStamp = undefined
        lib.chatHistory = newHistory
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

      if (!lib.chatHistoryActive) {
        lib.ClearHistory()
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
            asString(SOUNDS.NEGATIVE_CLICK),
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
