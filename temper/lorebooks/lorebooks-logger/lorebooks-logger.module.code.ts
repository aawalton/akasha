import {
  createAddonLog,
  type LogType,
} from "akasha/temper/addon-log/addon-log/addon-log.module.code.ts"
import { ADDON_NAME } from "akasha/temper/lorebooks/lorebooks-constants/lorebooks-constants.module.code.ts"

export let SHOW_LOG = true

export function setShowLog(value: boolean): undefined {
  SHOW_LOG = value
}

const LOG = createAddonLog(ADDON_NAME, function (this: void): boolean {
  return SHOW_LOG
})

export function dm(logType: LogType, ...args: unknown[]): undefined {
  LOG.dm(logType, ...args)
}
