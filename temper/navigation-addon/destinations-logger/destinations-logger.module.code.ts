import { createAddonLog } from "akasha/temper/addon-log/addon-log/addon-log.module.code.ts"
import { ADDON_NAME } from "akasha/temper/navigation-addon/destinations-names/destinations-names.module.code.ts"

export let showLog = true

const LOG = createAddonLog(ADDON_NAME, function (this: void): boolean {
  return showLog
})

export const logger = LOG.logger

export function dm(logType: string, ...args: unknown[]): undefined {
  LOG.dm(logType, ...args)
}
