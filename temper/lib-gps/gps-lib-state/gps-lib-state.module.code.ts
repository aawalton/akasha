import { createLogger } from "akasha/temper/addon-log/library-logger/library-logger.module.code.ts"
import { asLib } from "akasha/temper/lib-gps/gps-casts/gps-casts.module.code.ts"
import {
  BLACKREACH_ROOT_MAP_INDEX,
  CHAT_SHORT_TAG,
  LIB_EVENT_STATE_CHANGED,
  LIB_IDENTIFIER,
  TAMRIEL_MAP_INDEX,
} from "akasha/temper/lib-gps/gps-constants/gps-constants.module.code.ts"
import type { InternalState, Lib } from "akasha/temper/lib-gps/gps-types/gps-types.module.code.ts"

function createChat(this: void): LibChatMessageProxy {
  if (LibChatMessage === undefined) {
    error(`${LIB_IDENTIFIER} requires LibChatMessage`)
  }
  return LibChatMessage(LIB_IDENTIFIER, CHAT_SHORT_TAG)
}

export const INTERNAL: InternalState = {
  logger: createLogger(LIB_IDENTIFIER),
  chat: createChat(),
  TAMRIEL_MAP_INDEX,
  BLACKREACH_ROOT_MAP_INDEX,
}

export const lib: Lib = asLib({
  internal: INTERNAL,
  LIB_EVENT_STATE_CHANGED,
})
