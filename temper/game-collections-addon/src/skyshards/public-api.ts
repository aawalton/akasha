import { ADDON_NAME, ADDON_VERSION } from "./constants"

export interface TemperSkyShardsApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

declare global {
  var TemperSkyShards: TemperSkyShardsApi
}

globalThis.TemperSkyShards = {
  ADDON_NAME,
  ADDON_VERSION,
}
