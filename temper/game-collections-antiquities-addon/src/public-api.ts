import { ADDON_NAME, ADDON_VERSION } from "./constants"

export interface TemperAntiquitiesApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

declare global {
  var TemperAntiquities: TemperAntiquitiesApi
}

globalThis.TemperAntiquities = {
  ADDON_NAME,
  ADDON_VERSION,
}
