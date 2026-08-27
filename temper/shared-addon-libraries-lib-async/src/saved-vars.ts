import { asGlobalTable } from "./casts"
import { ASYNC_DEFAULT_STALL_THRESHOLD } from "./constants"
import { S } from "./state"

export function initSavedVar(this: void): undefined {
  const glob = asGlobalTable(globalThis)

  const sv = glob.AsyncSavedVars ?? {}
  glob.AsyncSavedVars = sv

  const threshold = sv.ASYNC_STALL_THRESHOLD ?? ASYNC_DEFAULT_STALL_THRESHOLD
  sv.ASYNC_STALL_THRESHOLD = threshold

  S.asyncStallThreshold = threshold
}

globalThis.InitSavedVar = initSavedVar
