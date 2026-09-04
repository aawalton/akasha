import {
  TAG_PREFIX_LONG,
  TAG_PREFIX_OFF,
  TAG_PREFIX_SHORT,
  TIME_FORMAT_AUTO,
  TIME_FORMATS,
  UNKNOWN_LINK_TYPE,
} from "../chat-message-constants/chat-message-constants.module.code.ts"
import type { Lib, Settings } from "../chat-message-types/chat-message-types.module.code.ts"

const DEFAULT_SETTINGS: Settings = {
  version: 1,
  timePrefixEnabled: false,
  timePrefixOnRegularChat: true,
  timePrefixFormat: TIME_FORMAT_AUTO,
  tagPrefixMode: TAG_PREFIX_LONG,
  historyEnabled: false,
  historyMaxAge: 3600,
}

function defaultReformatter(
  this: void,
  linkStyle: number,
  linkType: string,
  data: string,
  displayText: string
): string {
  return ZO_LinkHandler_CreateLink(displayText, undefined, linkType, linkStyle, data)
}

export const LIB: Lib = {
  defaultSettings: DEFAULT_SETTINGS,
  chatHistory: [],
  chatHistoryActive: true,
  registeredChatLinks: {},

  UNKNOWN_LINK_TYPE,
  TIME_FORMATS,
  TAG_PREFIX_OFF,
  TAG_PREFIX_LONG,
  TAG_PREFIX_SHORT,

  RegisterCustomChatLink(this: Lib, linkType, optionalReformatter) {
    if (optionalReformatter !== undefined && type(optionalReformatter) !== "function") {
      error("Reformatter has to be a function")
    }
    this.registeredChatLinks[linkType] = optionalReformatter ?? defaultReformatter
    ZO_VALID_LINK_TYPES_CHAT[linkType] = true
  },

  ClearChat(this: Lib) {
    if (!IsKeyboardUISupported()) {
      return
    }
    const activeWindows = KEYBOARD_CHAT_SYSTEM.windowPool.GetActiveObjects()
    for (const [, window] of pairs(activeWindows)) {
      window.buffer.Clear()
    }
  },

  ClearHistory(this: Lib) {
    this.chatHistory = []
    if (this.saveDataKey !== undefined && LibChatMessageHistory !== undefined) {
      LibChatMessageHistory[this.saveDataKey] = this.chatHistory
    }
  },

  GetHistory(this: Lib) {
    return this.chatHistory
  },

  SetTimePrefixEnabled(this: Lib, enabled) {
    if (this.settings !== undefined) {
      this.settings.timePrefixEnabled = enabled
    }
  },

  IsTimePrefixEnabled(this: Lib) {
    if (this.settings !== undefined) {
      return this.settings.timePrefixEnabled
    }
    return this.defaultSettings.timePrefixEnabled
  },

  SetRegularChatMessageTimePrefixEnabled(this: Lib, enabled) {
    if (this.settings !== undefined) {
      this.settings.timePrefixOnRegularChat = enabled
    }
  },

  IsRegularChatMessageTimePrefixEnabled(this: Lib) {
    if (this.settings !== undefined) {
      return this.settings.timePrefixOnRegularChat
    }
    return this.defaultSettings.timePrefixOnRegularChat
  },

  SetTimePrefixFormat(this: Lib, format) {
    if (this.settings !== undefined) {
      this.settings.timePrefixFormat = format
    }
  },

  GetTimePrefixFormat(this: Lib) {
    if (this.settings !== undefined) {
      return this.settings.timePrefixFormat
    }
    return this.defaultSettings.timePrefixFormat
  },

  SetTagPrefixMode(this: Lib, mode) {
    if (this.settings !== undefined) {
      this.settings.tagPrefixMode = mode
    }
  },

  GetTagPrefixMode(this: Lib) {
    if (this.settings !== undefined) {
      return this.settings.tagPrefixMode
    }
    return this.defaultSettings.tagPrefixMode
  },

  SetShortTagPrefixEnabled(this: Lib, enabled) {
    this.SetTagPrefixMode(enabled ? TAG_PREFIX_SHORT : TAG_PREFIX_LONG)
  },

  IsShortTagPrefixEnabled(this: Lib) {
    return this.GetTagPrefixMode() === TAG_PREFIX_SHORT
  },

  SetChatHistoryEnabled(this: Lib, enabled) {
    if (this.settings !== undefined) {
      this.settings.historyEnabled = enabled
    }
  },

  IsChatHistoryEnabled(this: Lib) {
    if (this.settings !== undefined) {
      return this.settings.historyEnabled
    }
    return this.defaultSettings.historyEnabled
  },

  IsChatHistoryActive(this: Lib) {
    return this.chatHistoryActive
  },

  SetChatHistoryMaxAge(this: Lib, maxAge) {
    if (this.settings !== undefined) {
      this.settings.historyMaxAge = maxAge
    }
  },

  GetChatHistoryMaxAge(this: Lib) {
    if (this.settings !== undefined) {
      return this.settings.historyMaxAge
    }
    return this.defaultSettings.historyMaxAge
  },
}
