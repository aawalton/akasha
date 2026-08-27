import { ADDON_NAME, ADDON_VERSION } from "./constants"

export interface TemperMapPinsApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

declare global {
  var TemperMapPins: TemperMapPinsApi
}

globalThis.TemperMapPins = {
  ADDON_NAME,
  ADDON_VERSION,
}
