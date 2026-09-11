import type { GlobalTable } from "akasha/temper/lib-debug-logger/debug-logger-casts/debug-logger-casts.module.code.ts"

import { LIB_IDENTIFIER } from "akasha/temper/lib-debug-logger/debug-logger-constants/debug-logger-constants.module.code.ts"
import { LIB } from "akasha/temper/lib-debug-logger/debug-logger-state/debug-logger-state.module.code.ts"

const globalTable = globalThis as GlobalTable
if (globalTable[LIB_IDENTIFIER] !== undefined) {
  error(`${LIB_IDENTIFIER} is already loaded`)
}

globalTable[LIB_IDENTIFIER] = LIB
