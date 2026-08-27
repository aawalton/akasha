import { ADDON_NAME, ADDON_VERSION } from "./constants"

declare global {
  var TemperDestinations: {
    ADDON_NAME: typeof ADDON_NAME
    ADDON_VERSION: typeof ADDON_VERSION
  }
}

globalThis.TemperDestinations = {
  ADDON_NAME,
  ADDON_VERSION,
}
