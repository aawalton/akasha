import { asLib } from "./casts"
import {
  BLACKREACH_ROOT_MAP_INDEX,
  CHAT_SHORT_TAG,
  LIB_EVENT_STATE_CHANGED,
  LIB_IDENTIFIER,
  TAMRIEL_MAP_INDEX,
} from "./constants"
import type { InternalState, Lib } from "./types"

function createLogger(this: void): DebugLogger {
  if (LibDebugLogger === undefined) {
    error(`${LIB_IDENTIFIER} requires LibDebugLogger`)
  }
  return LibDebugLogger(LIB_IDENTIFIER)
}

function createChat(this: void): LibChatMessageProxy {
  return LibChatMessage(LIB_IDENTIFIER, CHAT_SHORT_TAG)
}

export const internal: InternalState = {
  logger: createLogger(),
  chat: createChat(),
  TAMRIEL_MAP_INDEX,
  BLACKREACH_ROOT_MAP_INDEX,
}

export const lib: Lib = asLib({
  internal,
  LIB_EVENT_STATE_CHANGED,
})
