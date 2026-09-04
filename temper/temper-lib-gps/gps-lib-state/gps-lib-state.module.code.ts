import { asLib } from "../gps-casts/gps-casts.module.code.ts"
import {
  BLACKREACH_ROOT_MAP_INDEX,
  CHAT_SHORT_TAG,
  LIB_EVENT_STATE_CHANGED,
  LIB_IDENTIFIER,
  TAMRIEL_MAP_INDEX,
} from "../gps-constants/gps-constants.module.code.ts"
import type { InternalState, Lib } from "../gps-types/gps-types.module.code.ts"

function createLogger(this: void): DebugLogger {
  if (LibDebugLogger === undefined) {
    error(`${LIB_IDENTIFIER} requires LibDebugLogger`)
  }
  return LibDebugLogger(LIB_IDENTIFIER)
}

function createChat(this: void): LibChatMessageProxy {
  if (LibChatMessage === undefined) {
    error(`${LIB_IDENTIFIER} requires LibChatMessage`)
  }
  return LibChatMessage(LIB_IDENTIFIER, CHAT_SHORT_TAG)
}

export const INTERNAL: InternalState = {
  logger: createLogger(),
  chat: createChat(),
  TAMRIEL_MAP_INDEX,
  BLACKREACH_ROOT_MAP_INDEX,
}

export const lib: Lib = asLib({
  internal: INTERNAL,
  LIB_EVENT_STATE_CHANGED,
})
