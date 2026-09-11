import {
  createAddonLog,
  type LogType,
} from "akasha/temper/addon-log/addon-log/addon-log.module.code.ts"
import { ADDON_NAME } from "akasha/temper/skyshards/skyshards-constants/skyshards-constants.module.code.ts"

const LOG = createAddonLog(ADDON_NAME, function (this: void): boolean {
  return true
})

export function dm(this: void, logType: LogType, ...values: unknown[]): undefined {
  LOG.dm(logType, ...values)
}
