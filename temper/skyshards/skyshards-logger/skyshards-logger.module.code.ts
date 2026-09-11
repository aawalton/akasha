import {
  createAddonLog,
  type LogType,
} from "akasha/temper/addon-log/addon-log/addon-log.module.code.ts"
import { ADDON_NAME } from "akasha/temper/skyshards/skyshards-constants/skyshards-constants.module.code.ts"

let SHOW_LOG = true

export function setShowLog(this: void, value: boolean): undefined {
  SHOW_LOG = value
}

const LOG = createAddonLog(ADDON_NAME, function (this: void): boolean {
  return SHOW_LOG
})

export function dm(this: void, logType: LogType, ...values: unknown[]): undefined {
  LOG.dm(logType, ...values)
}
