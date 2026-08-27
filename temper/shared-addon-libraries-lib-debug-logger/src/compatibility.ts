import { CALLBACK_LOG_ADDED, CALLBACK_LOG_CLEARED, CALLBACK_LOG_PRUNED } from "./constants"
import { internal, lib } from "./lib-state"
import type { Lib } from "./types"

export function initCompatibility(): undefined {
  lib.CALLBACK_LOG_CLEARED = CALLBACK_LOG_CLEARED
  lib.CALLBACK_LOG_PRUNED = CALLBACK_LOG_PRUNED
  lib.CALLBACK_LOG_ADDED = CALLBACK_LOG_ADDED

  // @deprecated use lib.SESSION_START_TIME instead
  lib.GetSessionStartTime = function (this: Lib): number {
    return internal.SESSION_START_TIME
  }

  // @deprecated use lib.UI_LOAD_START_TIME instead
  lib.GetUiLoadStartTime = function (this: Lib): number {
    return internal.UI_LOAD_START_TIME
  }
}
