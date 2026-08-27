import { asGlobalTable } from "./casts"
import { LIB_IDENTIFIER } from "./constants"
import { lib } from "./lib-state"
import type { Lib } from "./types"

declare global {
  var LibDebugLogger: Lib | undefined
}

const globalTable = asGlobalTable(globalThis)
if (globalTable[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}

globalThis.LibDebugLogger = lib
