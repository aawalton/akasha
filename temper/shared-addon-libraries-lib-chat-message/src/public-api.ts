import { asGlobalTable } from "./casts"
import { LIB_IDENTIFIER } from "./constants"
import { lib } from "./lib-state"
import type { Lib } from "./types"

declare global {
  var LibChatMessage: Lib
}

const glob = asGlobalTable(globalThis)
if (glob[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}

globalThis.LibChatMessage = lib
