import type { GlobalTable } from "akasha/temper/lib-chat-message/chat-message-casts/chat-message-casts.module.code.ts"

import { LIB_IDENTIFIER } from "akasha/temper/lib-chat-message/chat-message-constants/chat-message-constants.module.code.ts"
import { LIB } from "akasha/temper/lib-chat-message/chat-message-lib/chat-message-lib.module.code.ts"

const glob = globalThis as GlobalTable
if (glob[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}

glob[LIB_IDENTIFIER] = LIB
