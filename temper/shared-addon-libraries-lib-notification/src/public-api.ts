import { asGlobalTable } from "./casts"
import { LIB_NAME } from "./constants"
import { lib } from "./lib"
import type { Lib } from "./types"

declare global {
  var LibNotifications: Lib
  var LibNotification: Lib
}

const glob = asGlobalTable(globalThis)
if (glob[LIB_NAME] !== undefined) {
  error(`${LIB_NAME} is already loaded`)
}

globalThis.LibNotifications = lib
globalThis.LibNotification = lib
