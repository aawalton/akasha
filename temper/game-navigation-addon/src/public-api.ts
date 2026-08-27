import { ADDON_NAME, ADDON_VERSION } from "./constants"

export interface TemperNavigationApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

declare global {
  var TemperNavigation: TemperNavigationApi
}

globalThis.TemperNavigation = {
  ADDON_NAME,
  ADDON_VERSION,
}
