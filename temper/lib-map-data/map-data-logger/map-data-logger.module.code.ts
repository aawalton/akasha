import {
  createAddonLog,
  type LogType,
} from "akasha/temper/addon-log/addon-log/addon-log.module.code.ts"
import { INTERNAL } from "akasha/temper/lib-map-data/map-data-lib-state/map-data-lib-state.module.code.ts"
import type { Internal } from "akasha/temper/lib-map-data/map-data-types/map-data-types.module.code.ts"

export function initLogger(this: void): undefined {
  const log = createAddonLog(INTERNAL.loggerName, function (this: void): boolean {
    return INTERNAL.show_log
  })
  INTERNAL.logger = log.logger
  INTERNAL.dm = function (this: Internal, logType: LogType, ...args: unknown[]): undefined {
    log.dm(logType, ...args)
  }
}
