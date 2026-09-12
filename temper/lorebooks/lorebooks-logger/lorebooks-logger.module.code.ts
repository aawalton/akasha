import {
  createAddonLog,
  type LogType,
} from "akasha/temper/addon-log/modules/addon-log/addon-log.module.code.ts"
import { ADDON_NAME } from "akasha/temper/lorebooks/lorebooks-constants/lorebooks-constants.module.code.ts"

const LOG = createAddonLog(ADDON_NAME, function (this: void): boolean {
  return true
})

export function dm(logType: LogType, ...args: unknown[]): undefined {
  LOG.dm(logType, ...args)
}
