import { CALLBACK_LOG_ADDED, CALLBACK_LOG_CLEARED, CALLBACK_LOG_PRUNED } from "./constants"
import { lib } from "./lib-state"

export function initCallbacks(): undefined {
  lib.callback.LOG_CLEARED = CALLBACK_LOG_CLEARED
  lib.callback.LOG_PRUNED = CALLBACK_LOG_PRUNED
  lib.callback.LOG_ADDED = CALLBACK_LOG_ADDED
}
