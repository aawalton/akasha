import { ADDON_NAME, ADDON_VERSION } from "./constants"
import type { TemperWritGlobal } from "./writworthy-global"


declare global {
  var TemperWrit: TemperWritGlobal
}

globalThis.TemperWrit = {
  name: ADDON_NAME,
  version: ADDON_VERSION,
}
