import { ADDON_NAME, ADDON_VERSION } from "../map-pins-names/map-pins-names.module.code.ts"

export interface TemperMapPinsApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

globalThis.TemperMapPins = {
  ADDON_NAME,
  ADDON_VERSION,
}
