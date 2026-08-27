import { ADDON_NAME, ADDON_VERSION } from "./constants"

export interface TemperEventsApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

declare global {
  var TemperEvents: TemperEventsApi
}

globalThis.TemperEvents = {
  ADDON_NAME,
  ADDON_VERSION,
}
