import { asString, asZoColorDef } from "./casts"
import { COLOR_FORMAT, LIB_IDENTIFIER, TAG_FORMAT, TAG_PREFIX_SHORT } from "./constants"
import { lib } from "./lib-state"
import type { ChatProxy, Lib } from "./types"

export function createChatProxy(this: void, longTag: string, shortTag: string): ChatProxy {
  const proxy: ChatProxy = {
    longTag,
    shortTag,
    enabled: true,

    SetTagColor(this: ChatProxy, color) {
      if (this.enabled) {
        if (type(color) === "table") {
          this.tagColor = asZoColorDef(color).ToHex()
        } else {
          this.tagColor = asString(color)
        }
      }
      return this
    },

    GetTag(this: ChatProxy) {
      const useShort = lib.settings?.tagPrefixMode === TAG_PREFIX_SHORT
      let tag = string.format(TAG_FORMAT, useShort ? this.shortTag : this.longTag)
      if (this.tagColor !== undefined) {
        tag = string.format(COLOR_FORMAT, this.tagColor, tag)
        this.tagColor = undefined
      }
      return tag
    },

    Print(this: ChatProxy, message) {
      if (!this.enabled) {
        return
      }
      const tag = this.GetTag()
      CHAT_ROUTER.FormatAndAddChatMessage(LIB_IDENTIFIER, tag, message)
    },

    Printf(this: ChatProxy, formatString, ...args) {
      if (!this.enabled) {
        return
      }
      const tag = this.GetTag()
      CHAT_ROUTER.FormatAndAddChatMessage(LIB_IDENTIFIER, tag, string.format(formatString, ...args))
    },

    SetEnabled(this: ChatProxy, enabled) {
      this.enabled = enabled
    },
  }
  return proxy
}

export function installChatProxy(this: void): undefined {
  lib.Create = createChatProxy
  setmetatable(lib, {
    __call(this: Lib, longTag: string, shortTag: string): ChatProxy {
      const create = lib.Create ?? createChatProxy
      return create(longTag, shortTag)
    },
  })
}
